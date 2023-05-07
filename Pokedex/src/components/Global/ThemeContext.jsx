import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


export const themeSetup = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                main: "#141b2d",
                contrastText: "#FFFFFF",
              },
              secondary: {
                main: "#4cceac",
              },
              neutral: {
                dark: "#3d3d3d",
                main: "#666666",
              },
              background: {
                default: "#141b2d",
              },
            }
          : {
              // palette values for light mode
              primary: {
                main: "#d0d1d5",
                contrastText: "#000000",
              },
              secondary: {
                main: "#141b2d",
              },
              neutral: {
                dark: "#3d3d3d",
                main: "#666666",
              },
              background: {
                default: "#fcfcfc",
              },
            }),
      },
    };
  };
  
  export const ThemeContext = createContext({ toggleColorMode: () => {} });
  
  export const useMode = () => {
    const [mode, setMode] = useState("light");
  
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        },
      }),
      []
    );
  
    const theme = useMemo(() => createTheme(themeSetup(mode)), [mode]);
  
    return [theme, colorMode];
  };