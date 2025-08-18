import { v4 as uuidv4 } from "uuid";
import { isAxiosError } from "axios";

export const formatIDR = (v: number | "" | null | undefined) =>
  v === "" || v == null
    ? ""
    : new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
      }).format(Number(v));

export const onlyDigitsToNumber = (s: string) => {
  const digits = s.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
};

export const randomString = () => {
  return uuidv4();
};

export const getToken = () => {
  return window.localStorage.getItem("token") as string;
};

// fileToBase64.ts
export async function fileToBase64(file?: File | null): Promise<{
  base64: string; // tanpa prefix data:
  dataUrl: string; // lengkap: data:<mime>;base64,xxxx
  mime: string;
  name: string;
  size: number;
} | null> {
  if (!file) return null;

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const [prefix, payload] = dataUrl.split(",");
  const mime = prefix.match(/^data:(.*);base64$/)?.[1] ?? file.type;

  return {
    base64: payload ?? "",
    dataUrl,
    mime,
    name: file.name,
    size: file.size,
  };
}

export function fileToBlobUrl(image: any) {
  const file =
    image instanceof FileList
      ? image[0]
      : image instanceof File
      ? image
      : undefined;
  if (!file) return { url: undefined, revoke: () => {} };
  const url = URL.createObjectURL(file);
  const revoke = () => URL.revokeObjectURL(url);
  return { url, revoke };
}

export function formatBytes(bytes: number, decimals = 2, binary = false) {
  const k = binary ? 1024 : 1000;
  if (bytes < k) return `${bytes} B`;
  const dm = decimals < 0 ? 0 : decimals;
  const units = binary
    ? ["B", "KiB", "MiB", "GiB", "TiB"]
    : ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${units[i]}`;
}

/** Ambil pesan server persis dari `response.data.message` kalau ada.
 *  - Jika array → dijoin ", "
 *  - Jika string → dikembalikan apa adanya
 *  - Jika tidak ada → fallback ke `data.error`, `statusText`, dll.
 */
export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const res = error.response;
    const data: any = res?.data;

    // 1) PRIORITAS UTAMA: persis response.data.message
    if (data?.message !== undefined) {
      if (typeof data.message === "string") return data.message;
      if (Array.isArray(data.message)) return data.message.join(", ");
    }

    // 2) Alternatif dari server
    if (typeof data?.error === "string") return data.error;
    if (typeof data === "string" && !/^<[^>]+>/.test(data)) return data; // kalau server kirim text biasa, bukan HTML

    // 3) Fallback HTTP / Axios
    return res?.statusText || error.message || "Terjadi kesalahan.";
  }

  // Non-Axios error
  return error instanceof Error ? error.message : "Terjadi kesalahan.";
}
