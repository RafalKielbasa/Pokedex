import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#242424" : "#EEE"};
  color: ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};
}

.arenaSpots {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#242424" : "#EEE"};
}

button {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#EEE" : "#111"};
    color: ${(props) => (props.theme.mode === "dark" ? "#111" : "#EEE")};

}

.btn-prev-page {
  border: ${(props) =>
    props.theme.mode === "dark" ? "2px solid white" : "2px solid black"};
  border-radius: 7px;
}
.btn-next-page {
  border: ${(props) =>
    props.theme.mode === "dark" ? "2px solid white" : "2px solid black"};
  border-radius: 7px;
}

.pokeEditingCard {
  background-color: ${(props) =>
    props.theme.mode === "dark" && "rgb(186, 184, 184)"};
  border: 1px solid ${(props) => props.theme.mode === "dark" && "#EEE"};
    color: ${(props) => props.theme.mode === "dark" && "#111"};

}
.poke-edit-button {
  background-color: ${(props) => props.theme.mode === "dark" && "grey"};
    color: ${(props) => props.theme.mode === "dark" && "#111"};
    border: ${(props) => props.theme.mode === "dark" && "2px solid white"};
    border-radius: 7px;

}
.login-row {
  border: 1px solid ${(props) =>
    props.theme.mode === "dark" ? "#EEE" : "#111"};
}

.noFavoritesModal {
  border: 1px solid ${(props) =>
    props.theme.mode === "dark" ? "#EEE" : "#111"};
}
.form {
  border: 1px solid ${(props) =>
    props.theme.mode === "dark" ? "#EEE" : "#111"};
    color: ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};

}

.form > div {
  border: 1px solid ${(props) =>
    props.theme.mode === "dark" ? "#EEE" : "#111"};
    color: ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};

}

.form > button {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#EEE" : "#111"};
    color: ${(props) => (props.theme.mode === "dark" ? "#111" : "#EEE")};
    

}

.form > label {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#111" : "#111"};
    color: ${(props) => (props.theme.mode === "dark" ? "#111" : "#EEE")};

}

.login-card-body > input {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#666" : "#FFF"};
    color: ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};
}

.inputSearch {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#DDD" : "#DDD"};
  color: ${(props) => (props.theme.mode === "dark" ? "#111" : "#111")};
  border: ${(props) =>
    props.theme.mode === "dark" ? "2px solid white" : "2px solid black"};
  border-radius: 7px;
}
`;

function DrawerAppBar(props) {
  const drawerWidth = 240;
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [bookmarkedPokemons, setBookmarkedPokemons] = useState([]);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme ? JSON.parse(savedTheme) : { mode: "light" };
  }

  useEffect(() => {
    const favoritesId = JSON.parse(localStorage.getItem("favoritesId"));
    if (favoritesId) {
      setFavoritePokemons(favoritesId);
    }
  }, []);

  useEffect(() => {
    const bookmarkedId = JSON.parse(localStorage.getItem("bookmarkedId"));
    if (bookmarkedId) {
      setBookmarkedPokemons(bookmarkedId);
    }
  }, []);

  const logout = () => {
    window.location.reload();
    localStorage.setItem("bookmarkedId", JSON.stringify([]));
    localStorage.setItem("favoritesId", JSON.stringify([]));
    localStorage.setItem("isLoggedIn", false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <AppBar
          sx={{
            backgroundColor: theme.mode === "dark" && "#666",
          }}
          component="nav"
        >
          <Toolbar>
            <GlobalStyle />
            <button
              className="btnDarkMode"
              onClick={() =>
                setTheme(
                  theme.mode === "dark" ? { mode: "light" } : { mode: "dark" }
                )
              }
            >
              {theme.mode === "dark" ? <WbSunnyIcon /> : <NightsStayIcon />}
            </button>
            <div className="pokedex">
              <ListItemButton>
                <Link to="/pokedex/1">POKEDEX</Link>
              </ListItemButton>
            </div>

            <Box
              sx={{
                position: "absolute",
                right: "50px",
              }}
              className="navButtons"
            >
              <Button>
                <Link to="/ranking">Ranking</Link>
              </Button>
              <Button>
                <Link to="/ulubione">Ulubione</Link>
              </Button>
              <Button>
                <Link to="/arena">Arena</Link>
              </Button>
              {loggedIn === "true" ? (
                <>
                  <Button>
                    <Link to="/edycja">Edycja</Link>
                  </Button>
                  <Button onClick={logout}>
                    <Link to="/pokedex/1">Wyloguj</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button>
                    <Link to="/logowanie">Logowanie</Link>
                  </Button>
                  <Button>
                    <Link to="/rejestracja">Rejestracja</Link>
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav"></Box>
        <Box component="main">
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DrawerAppBar;
