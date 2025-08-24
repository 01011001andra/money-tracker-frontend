// src/components/PageLoader.tsx
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Portal from "@mui/material/Portal";
import { useAppStore } from "@/stores/app";

const PageLoader: React.FC = () => {
  const { loading } = useAppStore();

  return (
    <Portal>
      <Backdrop
        open={loading.open}
        aria-live="polite"
        role="status"
        sx={(theme) => ({
          color: "#fff",
          position: "fixed",
          inset: 0,
          zIndex: theme.zIndex.modal + 1,
        })}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress color="inherit" />
          {loading.text ? (
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {loading.text}
            </Typography>
          ) : null}
        </Box>
      </Backdrop>
    </Portal>
  );
};

export default PageLoader;
