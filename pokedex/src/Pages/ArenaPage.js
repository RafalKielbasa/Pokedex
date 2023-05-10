import React from "react";
import { PokemonCard } from "./components";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonData } from "src/api";
const ArenaContainer = styled.div`
  display: flex;
  height: 660px;
  justify-content: space-evenly;
  align-items: center;
`;
const ArenaPage = ({ firstPokemonId, secondPokemonId }) => {
  const { data: firstFighter } = useQuery({
    queryKey: ["fighter1"],
    queryFn: () =>
      fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${firstPokemonId}`),
    enabled: firstPokemonId != null,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const { data: secondFighter } = useQuery({
    queryKey: ["fighter2"],
    queryFn: () =>
      fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${secondPokemonId}`),
    enabled: secondPokemonId != null,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  console.log({ firstFighter, secondFighter });
  return (
    <ArenaContainer>
      <PokemonCard value={firstFighter} />
      <span>VS</span>
      <PokemonCard value={secondFighter} />
    </ArenaContainer>
  );
};

export default ArenaPage;
