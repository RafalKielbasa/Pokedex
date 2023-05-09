import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "../components/Card";
import Box from "@mui/material/Box";
import Textfield from "../components/Textfield";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material";

const StyledBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Edycja() {
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0`
  );
  const [pokedex, setPokedex] = useState([]);
  const [search, setSearch] = useState();
  const [error, setError] = useState(null);
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
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

  return (
    <StyledBox style={{ backgroundColor: theme.palette.background.contrast }}>
      <h1>EDIT PAGE</h1>
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
          return <Card key={item.name} url={item.url} gate={true} />;
        })}
      </Box>
    </StyledBox>
  );
}
