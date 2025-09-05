// src/theme.ts
import { createTheme } from "@mui/material/styles";
// opsional: pakai palet siap pakai
// import { green } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      // pilih salah satu:
      // main: green[600],
      main: "#7c3aed", // ~ Tailwind green-600
      light: "#22c55e", // ~ green-500
      dark: "#15803d", // ~ green-700
      contrastText: "#fff",
    },
    // kalau mau tetap punya success berbeda, biarkan default
    // atau set sendiri:
    // success: { main: '#059669' } // ~ emerald-600
  },
});
