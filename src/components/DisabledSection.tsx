// DisabledSection.tsx
import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

export default function DisabledSection({
  label = "Ongoing feature",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ position: "relative" }}>
      {/* Overlay */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          bgcolor: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(1px)",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            px: 1.5,
            py: 0.75,
            borderRadius: 1.5,
            bgcolor: "var(--color-primary-600)",
            color: "white",
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Icon icon="mdi:hammer-wrench" width={16} height={16} />
          <Typography variant="caption" fontWeight={700}>
            {label}
          </Typography>
        </Box>
      </Box>

      {/* Konten diblok interaksinya + tampil “disabled” */}
      <Box sx={{ pointerEvents: "none", filter: "grayscale(1)", opacity: 0.6 }}>
        {children}
      </Box>
    </Box>
  );
}
