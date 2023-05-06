import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material";

export default function Ulubione({ favorites, setFavorites }) {
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  console.log("fav", favorites);

  useEffect(() => {
    axios
      .get("http://localhost:3001/favorites")
      .then((response) => setFavorites(response?.data?.map((item) => item.id)))
      .catch((error) => console.log("ulub", error));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "top",
        justifyContent: "center",
        height: "100vh",
      }}
      style={{
        backgroundColor: theme.palette.background.contrast,
      }}
    >
      {favorites.length >= 1 ? (
        favorites.map((item) => {
          return (
            <Card
              key={item}
              url={`https://pokeapi.co/api/v2/pokemon/${item}`}
              gate={true}
            />
          );
        })
      ) : (
        <h1 color="black">brak ulubionych pokemonow</h1>
      )}
    </Box>
  );
}
