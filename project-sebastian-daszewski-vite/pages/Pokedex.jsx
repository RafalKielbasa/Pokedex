import React from "react";
import MainLayout from "../layout/MainLayout";
import "/src/App.css";
import Input from "@mui/material/Input";
import Card from "../Components/Card";
import Pokeinfo from "/Components/Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#242424" : "#EEE"};
  color: ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};
}

`;
function Pokedex() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const { number } = useParams();
  const [query, setQuery] = useState("");
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const [theme, setTheme] = useState(getInitialTheme);

  const fetchPokemonData = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    const pokemonList = res.data.results;
    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        const { id, name, height, weight, base_experience, abilities } =
          response.data;

        return {
          id,
          name,
          height,
          weight,
          base_experience,
          ability: abilities[0].ability.name,
          wins: 0,
          loses: 0,
        };
      })
    );
    console.log(pokemonData, "pokemonData");
    setLoading(false);

    return pokemonData;
  };

  const savePokemonData = async (data) => {
    try {
      const existingData = await axios.get("http://localhost:4100/pokemonData");
      if (existingData.data.length > 0) {
        console.log(
          "Dane zostały już zapisane na serwerze JSON:",
          existingData.data
        );
        return existingData.data;
      }
      if (data.length > 151) {
        data = data.slice(0, 151);
      }
      const response = await axios.post(
        "http://localhost:4100/pokemonData",
        data
      );
      console.log("Dane zostały zapisane na serwerze JSON:", response.data);
      return response.data;
    } catch (error) {
      console.error("Błąd podczas zapisywania danych:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const pokemonData = await axios.get("http://localhost:4100/pokemonData");
      if (pokemonData.data.length === 0) {
        const data = await fetchPokemonData();
        await savePokemonData(data);
        setPokeData(data); // Dodaj ten kod
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              pokeData={pokeData}
              query={query}
              nextUrl={nextUrl}
              prevUrl={prevUrl}
            />
          </div>
        </div>
        <div className="right-content"></div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default Pokedex;
