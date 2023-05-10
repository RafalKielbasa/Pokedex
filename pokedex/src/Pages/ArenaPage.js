import React, { useState } from "react";
import { PokemonCard } from "./components";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPokemonData } from "src/api";
const ArenaContainer = styled.div`
  display: flex;
  height: 500px;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ArenaPage = ({
  firstPokemonId,
  secondPokemonId,
  firstPokemonAction,
  secondPokemonAction,
}) => {
  const queryClient = useQueryClient();
  const [fightResult, setFightResult] = useState("");
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
  const firstFighterPowerLevel =
    firstFighter?.data?.base_experience * firstFighter?.data?.weight;
  const secondFighterPowerLevel =
    secondFighter?.data?.base_experience * secondFighter?.data?.weight;
  const fightResultFnc = () => {
    firstFighterPowerLevel === secondFighterPowerLevel
      ? setFightResult("tie")
      : firstFighterPowerLevel > secondFighterPowerLevel
      ? setFightResult("first")
      : setFightResult("second");
  };
  const deleteFighter = (action) => {
    queryClient?.invalidateQueries({ queryKey: ["fighter1"] });
    action(null);
  };
  console.log({ firstFighter });
  return (
    <>
      <ArenaContainer>
        {firstFighterStatus === "success" ? (
          <>
            {fightResult === "first" ? (
              <>
                <span>WINNER</span>
                <button onClick={() => deleteFighter(firstPokemonAction)}>
                  USUŃ
                </button>
                <PokemonCard value={firstFighter} />
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    deleteFighter(firstPokemonAction, firstFighterStatus)
                  }
                >
                  USUŃ
                </button>
                <PokemonCard value={firstFighter} />
              </>
            )}
          </>
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
          <>
            {fightResult === "second" ? (
              <>
                <span>WINNER</span>
                <button onClick={() => secondPokemonAction(null)}>USUŃ</button>
                <PokemonCard value={secondFighter} />
              </>
            ) : (
              <>
                <button onClick={() => secondPokemonAction(null)}>USUŃ</button>
                <PokemonCard value={secondFighter} />
              </>
            )}
          </>
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
      {firstFighterStatus === "success" &&
        secondFighterStatus === "success" && (
          <ButtonContainer>
            <button onClick={fightResultFnc}>WALKA</button>
          </ButtonContainer>
        )}
    </>
  );
};

export default ArenaPage;
