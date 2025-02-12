"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useThemeStore }from "@/app/store";
import { ReactNode, useMemo } from "react";

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const mode = useThemeStore((state) => state.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "light" ? "#007BFF" : "#90CAF9" },
          background: {
            default: mode === "light" ? "#FFFFFF" : "#121212", // Dark mode background
            paper: mode === "light" ? "#FFFFFF" : "#1E1E1E", // Drawer and cards
          },
          text: {
            primary: mode === "light" ? "#212121" : "#FFFFFF",
          },
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === "light" ? "#F5F5F5" : "#333333", // Dark grey in dark mode
                color: mode === "light" ? "#000000" : "#FFFFFF",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
