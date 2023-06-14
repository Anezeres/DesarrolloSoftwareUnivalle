import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";



// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        black: {
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
        Primary: {
          100: "#dbdbdb",
          200: "#b6b6b6",
          300: "#929292",
          400: "#6d6d6d",
          500: "#494949",
          600: "#3a3a3a",
          700: "#2c2c2c",
          800: "#1d1d1d",
          900: "#0f0f0f"
        },
        yellowAccent: {
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
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        black: {
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
        Primary: {
          100: "#dbdbdb",
          200: "#b6b6b6",
          300: "#929292",
          400: "#f2f0f0",
          500: "#494949",
          600: "#3a3a3a",
          700: "#2c2c2c",
          800: "#1d1d1d",
          900: "#0f0f0f"
        },
        yellowAccent: {
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
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }),
});

// mui ajustes de tema
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Valores para paleta de colores - darkmode
            Primary: {
              main: colors.Primary[500],
            },
            secondary: {
              main: colors.yellowAccent[500],
            },
            neutral: {
              dark: colors.black[700],
              main: colors.black[500],
              light: colors.black[100],
            },
            background: {
              default: colors.Primary[500],
            },
          }
        : {
            // palette values for light mode
            Primary: {
              main: colors.Primary[100],
            },
            secondary: {
              main: colors.yellowAccent[500],
            },
            neutral: {
              dark: colors.black[700],
              main: colors.black[500],
              light: colors.black[100],
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

    iconColors:
     {
        light: {
            primary: colors.Primary[500],
            secondary: colors.yellowAccent[500],
            custom: "#bfff00", // Agrega tu color personalizado aquí
          },
          dark: {
            primary: colors.Primary[500],
            secondary: colors.yellowAccent[500],
            custom: "#bfff00", // Agrega tu color personalizado aquí
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


  