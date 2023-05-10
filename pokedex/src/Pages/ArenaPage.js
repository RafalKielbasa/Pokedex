import React from "react";
import { PokemonCard } from "./components";
import Card from "@mui/material/Card";
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
  const { data: firstFighter, status: firstFighterStatus } = useQuery({
    queryKey: ["fighter1"],
    queryFn: () =>
      fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${firstPokemonId}`),
    enabled: firstPokemonId != null,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const { data: secondFighter, status: secondFighterStatus } = useQuery({
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
      {firstFighterStatus === "success" ? (
        <PokemonCard value={firstFighter} />
      ) : (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 220,
            height: 300,
            background: "#E0E0E0",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Pierwszy Pokemon
        </Card>
      )}
      <span>VS</span>
      {secondFighterStatus === "success" ? (
        <PokemonCard value={secondFighter} />
      ) : (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 220,
            height: 300,
            background: "#E0E0E0",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Drugi Pokemon
        </Card>
      )}
    </ArenaContainer>
  );
};

export default ArenaPage;
