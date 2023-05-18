import { React, useState, useEffect } from "react";
import axios from "axios";

import { Pagination, styled, css } from "@mui/material";

import PokemonCard from "../components/PokemonCard";
import Textfield from "../components/Textfield";
import { useFetchLocalApi } from "../hooks/useFetchLocalApi";

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
  const [search, setSearch] = useState("");

  const { items: newPokemon, error: newPokemonError } =
    useFetchLocalApi("newPokemon");

  const { items: editedPokemonList, error: editedPokemonListError } =
    useFetchLocalApi("editedPokemon");

  useEffect(() => {
    const fetchData = async (url, search) => {
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
    fetchData(url, search);
  }, [url, search]);

  const searchFilter = (data, name) =>
    data?.filter(({ name: pokemonName }) => pokemonName.includes(name));

  const handlePaginationChange = (event, value) => {
    setUrl(
      `https://pokeapi.co/api/v2/pokemon/?offset=${(value - 1) * 15}&limit=15`
    );
  };

  return (
    <StyledContainer>
      <Textfield setSearch={setSearch} setUrl={setUrl} />
      <StyledContent>
        {pokedex?.map((item) => {
          return (
            <PokemonCard
              key={item.name}
              url={item.url}
              editedPokemonList={editedPokemonList}
            />
          );
        })}
      </StyledContent>

      {newPokemon?.length > 0 && (
        <>
          <Heading>Added Pokemons:</Heading>
          <StyledContent>
            {newPokemon?.map((element) => {
              return (
                <PokemonCard
                  key={element.id}
                  pokemon={element}
                  editedPokemonList={editedPokemonList}
                />
              );
            })}
          </StyledContent>
        </>
      )}

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
