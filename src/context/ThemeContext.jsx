import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const themeSetup = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#141b2d",
              contrast: "#8D8A8A",
            },
          }
        : {
            background: {
              default: "#3225E1",
              contrast: "#EBEBEB",
            },
          }),
    },
  };
};

export const ThemeContext = createContext({ toggleColorMode: () => {} });

export const useMode = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSetup(mode)), [mode]);

  return [theme, colorMode];
};

//https://mui.com/material-ui/customization/dark-mode/
