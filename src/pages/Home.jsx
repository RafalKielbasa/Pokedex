import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "../components/Card";
import Box from "@mui/material/Box";
import Textfield from "../components/Textfield";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";

export default function Home() {
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15`
  );
  const [pokedex, setPokedex] = useState([]);
  const [search, setSearch] = useState();

  const [error, setError] = useState(null);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "lightgray",
      }}
    >
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
          return <Card key={item.name} url={item.url} />;
        })}
      </Box>

      <Pagination
        count={10}
        color="primary"
        variant="outlined"
        onChange={handlePaginationChange}
      />
    </Box>
  );
}
