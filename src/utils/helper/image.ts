// src/utils/imageConvert.ts
export type ConvertOutputs = {
  base64?: boolean; // kembalikan base64 TANPA prefix
  blobUrl?: boolean; // URL.createObjectURL(...) untuk preview
  blob?: boolean; // Blob hasil (asli atau hasil resize)
  file?: boolean; // File hasil (nama/mime dipertahankan)
};

export type ResizeOptions = {
  maxWidth?: number; // default 1024
  maxHeight?: number; // default 1024
  quality?: number; // JPEG/WebP quality 0..1 (default 0.9)
  mimeType?: string; // mime output, default: file.type
  fit?: "contain" | "cover"; // default "contain"
};

export type ConvertOptions = {
  outputs?: ConvertOutputs;
  resize?: ResizeOptions | false; // false=tanpa resize
};

export type ConvertResult = {
  base64?: string; 
  blobUrl?: string; // ingat untuk revoke!
  blob?: Blob;
  file?: File;
  width?: number;
  height?: number;
  wasResized: boolean;
  mime: string;
  name: string;
  size: number; // size dari output (kalau resize, size blob)
  revokeBlobUrl?: () => void;
};

// ---------- helpers dasar ----------
const readAsDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });

const loadImageFromBlob = (
  blob: Blob
): Promise<{ img: HTMLImageElement; width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        img,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
      });
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  mime: string,
  quality?: number
) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      mime,
      quality
    );
  });

// ---------- resize ----------
async function resizeImageBlob(
  file: File,
  opts: ResizeOptions
): Promise<{ blob: Blob; width: number; height: number; wasResized: boolean }> {
  const {
    maxWidth = 1024,
    maxHeight = 1024,
    quality = 0.9,
    mimeType = file.type || "image/jpeg",
    fit = "contain",
  } = opts || {};

  const { img, width: srcW, height: srcH } = await loadImageFromBlob(file);
  let dstW = srcW;
  let dstH = srcH;

  // hitung target size
  if (fit === "contain") {
    const scale = Math.min(maxWidth / srcW, maxHeight / srcH, 1); // jangan upscale
    dstW = Math.round(srcW * scale);
    dstH = Math.round(srcH * scale);
  } else {
    // cover: paskan sisi terkecil, bisa crop secara letterbox
    const scale = Math.max(maxWidth / srcW, maxHeight / srcH, 1);
    dstW = Math.round(srcW * Math.min(scale, 1));
    dstH = Math.round(srcH * Math.min(scale, 1));
  }

  const wasResized = dstW !== srcW || dstH !== srcH;

  if (!wasResized) {
    // tidak perlu resize, return blob asli
    return { blob: file, width: srcW, height: srcH, wasResized: false };
  }

  const canvas = document.createElement("canvas");
  canvas.width = dstW;
  canvas.height = dstH;

  const ctx = canvas.getContext("2d")!;
  // kualitas resize yang lebih halus
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, dstW, dstH);

  const outBlob = await canvasToBlob(canvas, mimeType, quality);
  return { blob: outBlob, width: dstW, height: dstH, wasResized: true };
}

// ---------- API utama ----------
export async function convertImageFile(
  file: File,
  options: ConvertOptions = {}
): Promise<ConvertResult> {
  const outputs: ConvertOutputs = {
    base64: true, // default: kembalikan base64 tanpa prefix
    blobUrl: true, // default: sediakan blob URL untuk preview
    blob: false,
    file: false,
    ...(options.outputs || {}),
  };

  // 1) (opsional) resize
  const resized = options.resize
    ? await resizeImageBlob(file, options.resize)
    : { blob: file, wasResized: false, width: undefined, height: undefined };
  const outBlob = resized.blob;
  const mime = outBlob.type || file.type || "image/jpeg";
  const name = file.name;
  const width = resized.width;
  const height = resized.height;

  const result: ConvertResult = {
    wasResized: !!resized.wasResized,
    mime,
    name,
    size: outBlob.size,
    width,
    height,
  };

  // 2) turunkan output sesuai request
  if (outputs.base64) {
    const base64 = await readAsDataURL(
      new File([outBlob], name, { type: mime })
    );
    if (outputs.base64) result.base64 = base64; // TANPA prefix
  }

  if (outputs.blobUrl) {
    const url = URL.createObjectURL(outBlob);
    result.blobUrl = url;
    result.revokeBlobUrl = () => URL.revokeObjectURL(url);
  }

  if (outputs.blob) {
    result.blob = outBlob;
  }

  if (outputs.file) {
    result.file = new File([outBlob], name, { type: mime });
  }

  return result;
}
