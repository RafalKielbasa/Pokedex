import { useEffect, useState } from "react";
import axios from "axios";

import { useTheme } from "@mui/material";
import styled, { css } from "styled-components";

import PokemonCard from "../components/PokemonCard";

const StyledBox = styled("div")(
  ({ theme }) =>
    css`
      height: 100%;
      background-color: ${theme.palette.background.contrast};
    `
);

const StyledList = styled("div")(
  css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  `
);

const Heading = styled("h1")(
  css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  `
);

const Favorites = ({ favorites, setFavorites }) => {
  const [editedPokemonList, setEditedPokemonList] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:3001/favorites")
      .then((response) => setFavorites(response?.data))
      .catch((error) => console.log("ulub", error));

    axios
      .get(`http://localhost:3001/editedPokemon`)
      .then((response) => {
        setEditedPokemonList(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <StyledBox theme={theme}>
      <StyledList>
        {favorites.length >= 1 ? (
          favorites.map((item) => {
            return (
              <PokemonCard
                key={item.id}
                pokemon={item}
                gate={false}
                editedPokemonList={editedPokemonList}
              />
            );
          })
        ) : (
          <Heading>no favorite pokemon</Heading>
        )}
      </StyledList>
    </StyledBox>
  );
};
export default Favorites;
