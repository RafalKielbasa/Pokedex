import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Card from "../components/Card";
import Box from "@mui/material/Box";
import Textfield from "../components/Textfield";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";

const StyledBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Home() {
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15`
  );
  const [pokedex, setPokedex] = useState([]);
  const [search, setSearch] = useState();
  const [error, setError] = useState(null);
  const [newPokemon, setNewPokemon] = useState(null);

  const theme = useTheme();

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

  useEffect(() => {
    axios
      .get(`http://localhost:3001/newPokemon/`)
      .then((response) => {
        setNewPokemon(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  }, []);

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
    <StyledBox style={{ backgroundColor: theme.palette.background.contrast }}>
      <Textfield setSearch={setSearch} setUrl={setUrl} />
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
          return (
            <Card key={item.name} url={item.url} gate={false} newCard={false} />
          );
        })}
      </Box>
      <h3>Added Pokemons:</h3>
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

      <Pagination
        count={10}
        color="primary"
        variant="outlined"
        onChange={handlePaginationChange}
      />
    </StyledBox>
  );
}
