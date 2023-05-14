import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "../components/Card";
import styled from "styled-components";

const StyledBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  color: black;
`;

export default function Favorites({ favorites, setFavorites }) {
  const theme = useTheme();
  const [newPokemon, setNewPokemon] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/favorites")
      .then((response) => setFavorites(response?.data?.map((item) => item.id)))
      .catch((error) => console.log("ulub", error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/newPokemon/`)
      .then((response) => {
        setNewPokemon(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <StyledBox style={{ backgroundColor: theme.palette.background.contrast }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {favorites.length >= 1 ? (
          favorites.map((item) => {
            return (
              <Card
                key={item}
                url={`https://pokeapi.co/api/v2/pokemon/${item}`}
                gate={false}
              />
            );
          })
        ) : (
          <Heading>no favorite pokemon</Heading>
        )}
      </Box>
      <h3>Added Pokemons</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {newPokemon?.map((element) => {
          return (
            <Card
              key={element.name}
              url={`https://pokeapi.co/api/v2/pokemon/${element.id}`}
              gate={false}
              newCard={true}
            />
          );
        })}
      </Box>
    </StyledBox>
  );
}
