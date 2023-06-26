import * as React from "react";
import { useState, useEffect, useContext } from "react";

import {
  Stack,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { pokelogo } from "src/Images";
import { AppContext } from "src/context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import NavigationWrapper from "src/Navigation/NavigationWrapper";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Navigation = () => {
  const [user, setUser] = useState();
  const [switchIsDark, setswitchIsDark] = useState(false);

  const { toggleTheme, toggleLoggedIn, isDark, isLoggedIn, loggedChange } =
    useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userfromLS = localStorage.getItem("user");
    if (userfromLS) {
      setUser(userfromLS);
    } else setUser("");
  }, [loggedChange]);

  useEffect(() => {
    const switchIsDarkfromLS = localStorage.getItem("switchIsDark");
    if (switchIsDarkfromLS) {
      setswitchIsDark(switchIsDarkfromLS);
    }
    return;
  }, []);

  const toggleSwitch = () => {
    setswitchIsDark(!switchIsDark);
    console.log(`switchIsDark`, !switchIsDark);
    localStorage.setItem("switchIsDark", JSON.stringify(!switchIsDark));
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={
                switchIsDark === true || switchIsDark === "true" ? true : false
              }
              onClick={toggleSwitch}
            />
          }
          label="Light/Dark Mode"
          style={{
            position: "absolute",
            left: "50%",
            top: "10px",
          }}
        />
        {isLoggedIn == "true" && (
          <h5
            style={{
              position: "absolute",
              right: "10%",
              top: "4px",
            }}
          >
            Zalogowany użytkownik: {user ? user.slice(1, user.length - 1) : ""}
          </h5>
        )}
      </FormGroup>
      <NavigationWrapper src={pokelogo} alt={`Logo`} isDark={isDark}>
        <ThemeProvider theme={theme}>
          <Stack direction="row" spacing={2} style={{ marginRight: "120px" }}>
            <Link to="/">
              <Button
                color={isDark ? "secondary" : "primary"}
                variant="outlined"
              >
                HOME
              </Button>
            </Link>
            <Link to="favorites">
              <Button
                color={isDark ? "secondary" : "primary"}
                variant="outlined"
              >
                ULUBIONE
              </Button>
            </Link>
            <Link to="arena">
              <Button
                color={isDark ? "secondary" : "primary"}
                variant="outlined"
              >
                ARENA
              </Button>
            </Link>
            <Link to="ranking">
              <Button
                color={isDark ? "secondary" : "primary"}
                variant="outlined"
              >
                RANKING
              </Button>
            </Link>
            {isLoggedIn == "false" && (
              <Link to="login">
                <Button
                  color={isDark ? "secondary" : "primary"}
                  variant="outlined"
                >
                  LOGOWANIE
                </Button>
              </Link>
            )}
            {isLoggedIn == "false" && (
              <Link to="registration">
                <Button
                  color={isDark ? "secondary" : "primary"}
                  variant="outlined"
                >
                  REJESTRACJA
                </Button>
              </Link>
            )}
            {isLoggedIn == "true" && (
              <Link to="edition">
                <Button
                  color={isDark ? "secondary" : "primary"}
                  variant="outlined"
                >
                  EDYCJA
                </Button>
              </Link>
            )}
            {isLoggedIn == "true" && (
              <Button
                color={isDark ? "secondary" : "primary"}
                variant="outlined"
                onClick={() => {
                  localStorage.setItem("isLoggedIn", JSON.stringify(false));
                  localStorage.removeItem("user");
                  toggleLoggedIn();
                  navigate("/");
                }}
              >
                WYLOGUJ
              </Button>
            )}
          </Stack>
        </ThemeProvider>
      </NavigationWrapper>
    </>
  );
};
export default Navigation;
