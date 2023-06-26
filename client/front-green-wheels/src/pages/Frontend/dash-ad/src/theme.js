import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d4d4d4",
          200: "#a8a8a8",
          300: "#7d7d7d",
          400: "#515151",
          500: "#262626",
          600: "#1e1e1e",
          700: "#171717",
          800: "#0f0f0f",
          900: "#080808"
      },
        greenAccent: {
          100: "#f2f7df",
          200: "#e6efbf",
          300: "#d9e8a0",
          400: "#cde080",
          500: "#c0d860",
          600: "#9aad4d",
          700: "#73823a",
          800: "#4d5626",
          900: "#262b13"
      },
        redAccent: {
          100: "#f9e0d6",
          200: "#f4c1ad",
          300: "#eea284",
          400: "#e9835b",
          500: "#e36432",
          600: "#b65028",
          700: "#883c1e",
          800: "#5b2814",
          900: "#2d140a"
      },
        blueAccent: {
          100: "#def8fa",
          200: "#bcf1f6",
          300: "#9beaf1",
          400: "#79e3ed",
          500: "#58dce8",
          600: "#46b0ba",
          700: "#35848b",
          800: "#23585d",
          900: "#122c2e"
      },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#d4d4d4",
          200: "#a8a8a8",
          300: "#7d7d7d",
          400: "#f2f0f0",
          500: "#262626",
          600: "#1e1e1e",
          700: "#171717",
          800: "#0f0f0f",
          900: "#080808"
      },
        greenAccent: {
          100: "#f2f7df",
          200: "#e6efbf",
          300: "#d9e8a0",
          400: "#cde080",
          500: "#c0d860",
          600: "#9aad4d",
          700: "#73823a",
          800: "#4d5626",
          900: "#262b13"
      },
        redAccent: {
          100: "#f9e0d6",
          200: "#f4c1ad",
          300: "#eea284",
          400: "#e9835b",
          500: "#e36432",
          600: "#b65028",
          700: "#883c1e",
          800: "#5b2814",
          900: "#2d140a"
      },
        blueAccent: {
          100: "#def8fa",
          200: "#bcf1f6",
          300: "#9beaf1",
          400: "#79e3ed",
          500: "#58dce8",
          600: "#46b0ba",
          700: "#35848b",
          800: "#23585d",
          900: "#122c2e"
      },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};





