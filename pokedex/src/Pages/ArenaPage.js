import React, { useState } from "react";
import { BlankCard, PokemonCard } from "./components";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPokemonData } from "src/api";
import { Stadium, VS } from "src/img";
const ArenaBody = styled.div`
  background: url(${Stadium});
  height: 80vh;
`;
const ArenaContainer = styled.div`
  display: flex;
  height: 700px;
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
  const [isPokemonDeleted, setIsPokemonDeleted] = useState(false);
  const { data: firstFighter, status: firstFighterStatus } = useQuery({
    queryKey: ["fighter1"],
    queryFn: () => fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${firstPokemonId}`),
    enabled: firstPokemonId != null,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const { data: secondFighter, status: secondFighterStatus } = useQuery({
    queryKey: ["fighter2"],
    queryFn: () => fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${secondPokemonId}`),
    enabled: secondPokemonId != null,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  const firstFighterPowerLevel = firstFighter?.data?.base_experience * firstFighter?.data?.weight;
  const secondFighterPowerLevel =
    secondFighter?.data?.base_experience * secondFighter?.data?.weight;
  const fightResultFnc = () => {
    firstFighterPowerLevel === secondFighterPowerLevel
      ? setFightResult("tie")
      : firstFighterPowerLevel > secondFighterPowerLevel
      ? setFightResult("first")
      : setFightResult("second");
  };
  const deleteFighter = (action, queryKeyToDelete) => {
    action(null);
    setIsPokemonDeleted(true);
    queryClient?.removeQueries({ queryKey: [{ queryKeyToDelete }], exact: true });
  };
  console.log({ firstPokemonId });
  return (
    <ArenaBody>
      <ArenaContainer>
        {firstFighterStatus === "success" && !isPokemonDeleted ? (
          <>
            {fightResult === "first" ? (
              <>
                <span>WINNER</span>
                <button onClick={() => deleteFighter(firstPokemonAction, "fighter1")}>USUŃ</button>
                <PokemonCard value={firstFighter} />
              </>
            ) : (
              <>
                <button onClick={() => deleteFighter(firstPokemonAction, "fighter1")}>USUŃ</button>
                <PokemonCard value={firstFighter} />
              </>
            )}
          </>
        ) : (
          <BlankCard value={"Pierwszy Pokemon"} />
        )}
        <img src={VS} alt="VS" width={"200px"} height={"200px"} />
        {secondFighterStatus === "success" && !isPokemonDeleted ? (
          <>
            {fightResult === "second" ? (
              <>
                <span>WINNER</span>
                <button onClick={() => deleteFighter(secondPokemonAction, "fighter2")}>USUŃ</button>
                <PokemonCard value={secondFighter} />
              </>
            ) : (
              <>
                <button onClick={() => deleteFighter(secondPokemonAction, "fighter2")}>USUŃ</button>
                <PokemonCard value={secondFighter} />
              </>
            )}
          </>
        ) : (
          <BlankCard value={"Drugi Pokemon"} />
        )}
      </ArenaContainer>
      {firstFighterStatus === "success" && secondFighterStatus === "success" && (
        <ButtonContainer>
          <button onClick={fightResultFnc}>WALKA</button>
        </ButtonContainer>
      )}
    </ArenaBody>
  );
};

export default ArenaPage;
