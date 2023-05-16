import { useState, useEffect } from "react";

import Pagination from "@mui/material/Pagination";
import React from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";

import { styled, css, Box, useTheme } from "@mui/material";

const StyledBox = styled(Box)(css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`);

const EditList = () => {
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15`
  );
  const theme = useTheme();
  const [pokedex, setPokedex] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setPokedex(response.data.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  const handlePaginationChange = (event, value) => {
    setUrl(
      `https://pokeapi.co/api/v2/pokemon/?offset=${(value - 1) * 15}&limit=15`
    );
  };
  return (
    <StyledBox>
      <h1 style={{ color: "black" }}>EDIT PAGE</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {pokedex?.map((item) => {
          return <PokemonCard key={item.name} url={item.url} gate={true} />;
        })}
      </Box>
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
