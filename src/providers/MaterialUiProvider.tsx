import { theme } from "@/utils/theme";
import { ThemeProvider } from "@emotion/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { type PropsWithChildren } from "react";

const MaterialUiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default MaterialUiProvider;
