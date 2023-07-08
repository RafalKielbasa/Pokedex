import React from "react";
import MainLayout from "../layout/MainLayout";
import "/src/App.css";
import Input from "@mui/material/Input";
import Card from "../Components/Card";
import Pokeinfo from "/Components/Pokeinfo";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Favorites from "./Favorites";
import Ranking from "./Ranking";
import { AppContext } from "../src/AppContext";

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#242424" : "#EEE"};
  color: ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};
}

`;
function Pokedex() {
  const { pokesData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const { number } = useParams();
  const [query, setQuery] = useState("");
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.body.className = theme.mode;
  }, [theme]);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme ? JSON.parse(savedTheme) : { mode: "light" };
  }

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainLayout>
        <div className="search">
          <Input
            className="inputSearch"
            placeholder="Search"
            onChange={(e) => {
              setQuery(e.target.value.toLowerCase());
              if (e.target.value) {
                document
                  .querySelector(".current")
                  .classList.add("current-disabled");
              } else {
                document
                  .querySelector(".current")
                  .classList.remove("current-disabled");
              }
            }}
          />
        </div>
        <div className="container">
          <div className="left-content">
            <Card
              loading={loading}
              pokeData={pokesData}
              query={query}
              nextUrl={nextUrl}
              prevUrl={prevUrl}
            />
          </div>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default Pokedex;
