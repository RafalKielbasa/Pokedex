import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import React from "react";
import axios from "axios";
import Card from "../components/Card";
import Box from "@mui/material/Box";
import styled from "styled-components";

const StyledBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function EditList() {
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0`
  );
  const [pokedex, setPokedex] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme();

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
