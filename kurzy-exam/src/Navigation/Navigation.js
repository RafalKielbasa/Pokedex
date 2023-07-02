import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Stack, Button, FormGroup, FormControlLabel } from "@mui/material";
import { pokelogo } from "src/Images";
import { AppContext } from "src/context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import NavigationWrapper from "src/Navigation/NavigationWrapper";
import { ThemeProvider } from "@mui/material/styles";
import MaterialUISwitch from "src/Components/MaterialUISwitch";

const Navigation = () => {
  const [user, setUser] = useState();
  const [switchIsDark, setswitchIsDark] = useState(false);

  const {
    theme,
    theme2,
    toggleLoggedIn,
    isDark,
    isLoggedIn,
    loggedChange,
    toggleSwitchChange,
    handleActiveButton,
    activeButton,
  } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userfromLS = localStorage.getItem("user");
    if (userfromLS) {
      setUser(userfromLS);
    } else setUser("");
  }, [loggedChange]);

  const toggleSwitch = () => {
    setswitchIsDark(!switchIsDark);
    localStorage.setItem("switchIsDark", JSON.stringify(!switchIsDark));
    toggleSwitchChange();
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={isDark === true || isDark === "true" ? true : false}
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
        <ThemeProvider theme={theme2}>
          <Stack direction="row" spacing={2} style={{ marginRight: "120px" }}>
            <Link to="/">
              <Button
                color={
                  isDark
                    ? "secondary"
                    : activeButton === "Home"
                    ? "secondary"
                    : "primary"
                }
                style={{
                  backgroundColor: `${
                    activeButton === "Home"
                      ? "#d30000"
                      : isDark
                      ? "#616161"
                      : "white"
                  }`,
                }}
                variant="outlined"
                activeButton={activeButton}
                value={"Home"}
                onClick={(e) => handleActiveButton(e.target.value)}
              >
                HOME
              </Button>
            </Link>
            <Link to="favorites">
              <Button
                color={
                  isDark
                    ? "secondary"
                    : activeButton === "Ulubione"
                    ? "secondary"
                    : "primary"
                }
                style={{
                  backgroundColor: `${
                    activeButton === "Ulubione"
                      ? "#d30000"
                      : isDark
                      ? "#616161"
                      : "white"
                  }`,
                }}
                variant="outlined"
                activeButton={activeButton}
                value={"Ulubione"}
                onClick={(e) => handleActiveButton(e.target.value)}
              >
                ULUBIONE
              </Button>
            </Link>
            <Link to="arena">
              <Button
                color={
                  isDark
                    ? "secondary"
                    : activeButton === "Arena"
                    ? "secondary"
                    : "primary"
                }
                style={{
                  backgroundColor: `${
                    activeButton === "Arena"
                      ? "#d30000"
                      : isDark
                      ? "#616161"
                      : "white"
                  }`,
                }}
                variant="outlined"
                activeButton={activeButton}
                value={"Arena"}
                onClick={(e) => handleActiveButton(e.target.value)}
              >
                ARENA
              </Button>
            </Link>
            <Link to="ranking">
              <Button
                color={
                  isDark
                    ? "secondary"
                    : activeButton === "Ranking"
                    ? "secondary"
                    : "primary"
                }
                style={{
                  backgroundColor: `${
                    activeButton === "Ranking"
                      ? "#d30000"
                      : isDark
                      ? "#616161"
                      : "white"
                  }`,
                }}
                variant="outlined"
                activeButton={activeButton}
                value={"Ranking"}
                onClick={(e) => handleActiveButton(e.target.value)}
              >
                RANKING
              </Button>
            </Link>
            {isLoggedIn == "false" && (
              <Link to="login">
                <Button
                  color={
                    isDark
                      ? "secondary"
                      : activeButton === "Logowanie"
                      ? "secondary"
                      : "primary"
                  }
                  style={{
                    backgroundColor: `${
                      activeButton === "Logowanie"
                        ? "#d30000"
                        : isDark
                        ? "#616161"
                        : "white"
                    }`,
                  }}
                  variant="outlined"
                  activeButton={activeButton}
                  value={"Logowanie"}
                  onClick={(e) => handleActiveButton(e.target.value)}
                >
                  LOGOWANIE
                </Button>
              </Link>
            )}
            {isLoggedIn == "false" && (
              <Link to="registration">
                <Button
                  color={
                    isDark
                      ? "secondary"
                      : activeButton === "Rejestracja"
                      ? "secondary"
                      : "primary"
                  }
                  style={{
                    backgroundColor: `${
                      activeButton === "Rejestracja"
                        ? "#d30000"
                        : isDark
                        ? "#616161"
                        : "white"
                    }`,
                  }}
                  variant="outlined"
                  activeButton={activeButton}
                  value={"Rejestracja"}
                  onClick={(e) => handleActiveButton(e.target.value)}
                >
                  REJESTRACJA
                </Button>
              </Link>
            )}
            {isLoggedIn == "true" && (
              <Link to="edition">
                <Button
                  color={
                    isDark
                      ? "secondary"
                      : activeButton === "Edycja"
                      ? "secondary"
                      : "primary"
                  }
                  style={{
                    backgroundColor: `${
                      activeButton === "Edycja"
                        ? "#d30000"
                        : isDark
                        ? "#616161"
                        : "white"
                    }`,
                  }}
                  variant="outlined"
                  activeButton={activeButton}
                  value={"Edycja"}
                  onClick={(e) => handleActiveButton(e.target.value)}
                >
                  EDYCJA
                </Button>
              </Link>
            )}
            {isLoggedIn == "true" && (
              <Button
                color={
                  isDark
                    ? "secondary"
                    : activeButton === "Wyloguj"
                    ? "secondary"
                    : "primary"
                }
                style={{
                  backgroundColor: `${
                    activeButton === "Wyloguj"
                      ? "#d30000"
                      : isDark
                      ? "#616161"
                      : "white"
                  }`,
                }}
                variant="outlined"
                activeButton={activeButton}
                value={"Wyloguj"}
                onClick={(e) => {
                  localStorage.setItem("isLoggedIn", JSON.stringify(false));
                  localStorage.removeItem("user");
                  handleActiveButton(e.target.value);
                  toggleLoggedIn();
                  navigate("/");
                  handleActiveButton("Home");
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
