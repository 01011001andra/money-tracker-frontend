import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import React, { useRef } from "react";

type Props = {
  onGallery: (file: File) => void; // handler dari parent
};

export default function ImageChat({ onGallery }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const mainFabSx: SxProps<Theme> = {
    width: 30,
    height: 30,
    minHeight: 30,
    boxShadow: "0 6px 14px -8px rgba(0,0,0,.35)",
    "& svg": { fontSize: 18 },
  };

  const actionFabSx: SxProps<Theme> = {
    width: 36,
    height: 36,
    minHeight: 36,
    boxShadow: "0 8px 16px -10px rgba(0,0,0,.25)",
    "& svg": { fontSize: 18 },
  };

  const openGalleryPicker = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onGallery(f);
    e.target.value = ""; // reset agar bisa pilih file yg sama lagi
  };

  return (
    <Box className="fixed bottom-4 right-13 z-50">
      {/* input file tersembunyi */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <SpeedDial
        ariaLabel="SpeedDial"
        direction="up"
        FabProps={{ sx: mainFabSx, color: "primary" }}
        icon={<Icon icon="tabler:plus" />}
      >
        <SpeedDialAction
          key="camera"
          tooltipTitle="Camera"
          tooltipPlacement="left"
          FabProps={{ sx: actionFabSx }}
          icon={<Icon icon="tabler:camera" className="size-5 text-primary" />}
          // belum ada handler — dibiarkan saja
          onClick={() => {
            alert("coming soon");
          }}
        />
        <SpeedDialAction
          key="gallery"
          tooltipTitle="Gallery"
          tooltipPlacement="left"
          FabProps={{ sx: actionFabSx }}
          icon={<Icon icon="tabler:photo" className="size-5 text-primary" />}
          onClick={openGalleryPicker}
        />
      </SpeedDial>
    </Box>
  );
}
