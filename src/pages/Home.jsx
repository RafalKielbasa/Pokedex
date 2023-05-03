import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "../components/Card";
import Box from "@mui/material/Box";

export default function Home() {
  const [error, setError] = useState(null);
  const [pokedex, setPokedex] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        setPokedex(response.data.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {pokedex.map((item) => {
        return <Card key={item.name} url={item.url} />;
      })}
    </Box>
  );
}
