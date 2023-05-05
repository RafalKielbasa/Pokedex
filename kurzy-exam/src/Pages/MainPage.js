import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PokemonCard from "../Components/PokemonCards";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MainPageWrapper = styled.div`
  margin-bottom: 20px;
  padding: 0px 40px 0px 40px;
`;
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 38px;
`;
const PokemonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const MainPage = () => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [response, setResponse] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  console.log(`pokemonData`, pokemonData);
  console.log(`offset`, offset);

  useEffect(() => {
    async function getResults() {
      const response = await axios.get(`${BASE_URL}?limit=15&offset=${offset}`);
      setResponse(response.data.results);
    }
    getResults();
  }, [offset]);

  useEffect(() => {
    async function getPokemonData() {
      response?.map(async (item) => {
        const result = await axios.get(item.url);
        setPokemonData((resultUrl) => {
          resultUrl = [...resultUrl, result?.data];
          resultUrl.sort((a, b) => (a.id > b.id ? 1 : -1));
          return resultUrl;
        });
      });
    }
    setPokemonData([]);
    getPokemonData();
  }, [response]);

  const handleChange = (event, value) => {
    setPage(value);
    setOffset((value - 1) * 15);
  };

  return (
    <MainPageWrapper>
      <PaginationWrapper>
        <Stack spacing={2}>
          <Pagination
            page={page}
            count={10}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Stack>
      </PaginationWrapper>

      <PokemonWrapper>
        {pokemonData.map((item) => (
          <PokemonCard
            id={item.id}
            pic={item.sprites.front_default}
            name={item.name}
            height={item.height}
            baseexp={item.base_experience}
            weight={item.weight}
            abilitie={item.abilities[0].ability.name}
          />
        ))}
      </PokemonWrapper>

      <PaginationWrapper>
        <Stack spacing={2}>
          <Pagination
            page={page}
            count={10}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            sx={{ marginTop: 2 }}
          />
        </Stack>
      </PaginationWrapper>
    </MainPageWrapper>
  );
};
export default MainPage;
