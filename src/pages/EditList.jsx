import { useState, useEffect } from "react";
import axios from "axios";

import { Pagination, styled, css, Box } from "@mui/material";

import PokemonCard from "../components/PokemonCard";
import { useFetchLocalApi } from "../hooks/useFetchLocalApi";

const StyledBox = styled(Box)(
  ({ theme }) =>
    css`
      height: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: ${theme.palette.background.contrast};
    `
);

const StyledContent = styled(Box)(
  css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  `
);

const Heading = styled("h1")(
  css`
    color: black;
  `
);

const EditList = () => {
  const [pokedex, setPokedex] = useState([]);
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15`
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setPokedex(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [url]);

  const { items: editedPokemonList } = useFetchLocalApi("editedPokemon");

  const handlePaginationChange = (event, value) => {
    setUrl(
      `https://pokeapi.co/api/v2/pokemon/?offset=${(value - 1) * 15}&limit=15`
    );
  };
  return (
    <StyledBox>
      <Heading>EDIT PAGE</Heading>
      <StyledContent>
        {pokedex?.map((item) => {
          return (
            <PokemonCard
              key={item.name}
              url={item.url}
              gate={true}
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
    </StyledBox>
  );
};

export default EditList;
