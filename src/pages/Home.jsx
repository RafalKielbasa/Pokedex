import { useTheme, Box, Pagination } from "@mui/material";
import { React, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import Textfield from "../components/Textfield";

const StyledContainer = styled("div")(
  ({ theme }) =>
    css`
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: ${theme.palette.background.contrast};
      padding-bottom: 30px;
    `
);

const StyledContent = styled("div")(
  css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  `
);

const Heading = styled("h3")(
  css`
    color: black;
  `
);

const Home = () => {
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15`
  );
  const [pokedex, setPokedex] = useState([]);
  const [search, setSearch] = useState();
  const [error, setError] = useState(null);
  const [newPokemon, setNewPokemon] = useState(null);

  const [editedPokemonList, setEditedPokemonList] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/editedPokemon`)
      .then((response) => {
        setEditedPokemonList(response.data);
      })
      .catch((error) => {});
    axios
      .get(`http://localhost:3001/newPokemon/`)
      .then((response) => {
        setNewPokemon(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          search ? "https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0" : url
        );
        const data = response.data.results;

        search
          ? setPokedex(searchFilter(data, search))
          : setPokedex(response.data.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [url, search]);

  const searchFilter = (data, name) => {
    const filtered = data?.filter((item) => {
      const result = item.name.includes(name);
      return result;
    });
    return filtered;
  };

  const handlePaginationChange = (event, value) => {
    setUrl(
      `https://pokeapi.co/api/v2/pokemon/?offset=${(value - 1) * 15}&limit=15`
    );
  };

  return (
    <StyledContainer theme={theme}>
      <Textfield setSearch={setSearch} setUrl={setUrl} />
      <StyledContent theme={theme}>
        {pokedex?.map((item) => {
          return (
            <PokemonCard
              key={item.name}
              url={item.url}
              gate={false}
              editedPokemonList={editedPokemonList}
            />
          );
        })}
      </StyledContent>

      <Heading>Added Pokemons:</Heading>
      <StyledContent theme={theme}>
        {newPokemon?.map((element) => {
          return (
            <PokemonCard
              key={element.id}
              pokemon={element}
              gate={false}
              editedPokemonList={editedPokemonList}
            />
          );
        })}
      </StyledContent>

      <Pagination
        count={10}
        color="primary"
        variant="outlined"
        onChange={handlePaginationChange}
      />
    </StyledContainer>
  );
};

export default Home;
