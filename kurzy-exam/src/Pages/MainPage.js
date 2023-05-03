import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PokemonCard from "./PokemonCards";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MainPageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MainPage = () => {
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [response, setResponse] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  console.log(`next`, next);
  console.log(`prev`, prev);
  console.log(`pokemonData`, pokemonData);

  useEffect(() => {
    async function getResults() {
      const response = await axios.get(BASE_URL);
      setNext(response.data.next);
      setPrev(response.data.previous);
      setResponse(response.data.results);
    }
    getResults();
  }, []);

  useEffect(() => {
    async function getPokemonData() {
      response?.map(async (item) => {
        const result = await axios.get(item.url);
        setPokemonData((resultUrl) => {
          resultUrl = [...resultUrl, result?.data];
          return resultUrl;
        });
      });
    }
    getPokemonData();
  }, [response]);

  return (
    <MainPageWrapper>
      {pokemonData.map((item) => (
        <>
          <div>{item.name}</div>
          <img src={item.sprites.front_default}></img>
          <PokemonCard />
        </>
      ))}
    </MainPageWrapper>
  );
};
export default MainPage;
