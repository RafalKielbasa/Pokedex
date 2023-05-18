import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


export const themeSetup = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              primary: {
                main: "#E0B420",
                contrastText: "#FFFFFF",
              },
              secondary: {
                main: "#4cceac",
              },
              neutral: {
                dark: "#3d3d3d",
                main: "#666666",
              },
              background: "#141b2d",
              color: "#FFFFFF",
            
            }
          : {
              primary: {
                main: "#E0B420",
                contrastText: "#000000",
              },
              secondary: {
                main: "#141b2d",
              },
              neutral: {
                dark: "#3d3d3d",
                main: "#666666",
              },
              background:"#fcfcfc",
              color: "#000000",
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