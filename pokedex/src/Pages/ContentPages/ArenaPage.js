import React, { useState } from "react";
import { BlankCard, PokemonCard } from "../components";
import styled from "styled-components";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Stadium, VS, Winner } from "src/img";
import { arenaFirstOneActionHandle, arenaSecondOneActionHandle } from "src/api";
import { fighterPowerLevel } from "src/helpers";
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
const ArenaCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const ArenaPage = ({
  firstPokemonId,
  secondPokemonId,
  firstPokemonAction,
  secondPokemonAction,
  pokemonQueries,
}) => {
  const queryClient = useQueryClient();
  const [fightResult, setFightResult] = useState("");
  const [isFirstPokemonDeleted, setIsFirstPokemonDeleted] = useState(false);
  const [isSecondPokemonDeleted, setIsSecondPokemonDeleted] = useState(false);

  const firstFighter = pokemonQueries?.filter(
    ({ data }) => Number(data?.data?.id) === Number(firstPokemonId)
  );
  const secondFighter = pokemonQueries?.filter(
    ({ data }) => Number(data?.data?.id) === Number(secondPokemonId)
  );
  console.log({ firstFighter, secondFighter });
  const firstFighterPowerLevel = fighterPowerLevel(firstFighter[0]);
  const secondFighterPowerLevel = fighterPowerLevel(secondFighter[0]);

  const firstFighterMutation = useMutation({
    mutationFn: () =>
      arenaFirstOneActionHandle(
        firstFighter[0]?.data?.data,
        firstPokemonId,
        firstFighterPowerLevel,
        secondFighterPowerLevel
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["pokemon", firstFighter[0]?.data?.data?.name], data);
    },
  });
  const secondFighterMutation = useMutation({
    mutationFn: () =>
      arenaSecondOneActionHandle(
        secondFighter[0]?.data?.data,
        secondPokemonId,
        firstFighterPowerLevel,
        secondFighterPowerLevel
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["pokemon", secondFighter[0]?.data?.data?.name], data);
    },
  });

  const fightResultFnc = async () => {
    firstFighterPowerLevel === secondFighterPowerLevel
      ? setFightResult("tie")
      : firstFighterPowerLevel > secondFighterPowerLevel
      ? setFightResult("first")
      : setFightResult("second");
    await firstFighterMutation.mutateAsync();
    await secondFighterMutation.mutateAsync();
  };
  const deleteFighter = (action, deletedPokemonState) => {
    action(null);
    deletedPokemonState(true);
  };
  return (
    <ArenaBody>
      <ArenaContainer>
        {firstFighter.length > 0 && !isFirstPokemonDeleted ? (
          <>
            {fightResult === "first" ? (
              <ArenaCardContainer>
                <img src={Winner} alt="Winner" width={"200px"} height={"200px"} />
                <button onClick={() => deleteFighter(firstPokemonAction, setIsFirstPokemonDeleted)}>
                  USUŃ
                </button>
                <PokemonCard value={firstFighter[0]?.data} />
              </ArenaCardContainer>
            ) : (
              <ArenaCardContainer>
                <button onClick={() => deleteFighter(firstPokemonAction, setIsFirstPokemonDeleted)}>
                  USUŃ
                </button>
                <PokemonCard value={firstFighter[0]?.data} />
              </ArenaCardContainer>
            )}
          </>
        ) : (
          <BlankCard value={"Pierwszy Pokemon"} />
        )}
        <img src={VS} alt="VS" width={"200px"} height={"200px"} />
        {secondFighter.length > 0 && !isSecondPokemonDeleted ? (
          <>
            {fightResult === "second" ? (
              <ArenaCardContainer>
                <img src={Winner} alt="Winner" width={"200px"} height={"200px"} />
                <button
                  onClick={() => deleteFighter(secondPokemonAction, setIsSecondPokemonDeleted)}
                >
                  USUŃ
                </button>
                <PokemonCard value={secondFighter[0]?.data} />
              </ArenaCardContainer>
            ) : (
              <ArenaCardContainer>
                <button
                  onClick={() => deleteFighter(secondPokemonAction, setIsSecondPokemonDeleted)}
                >
                  USUŃ
                </button>
                <PokemonCard value={secondFighter[0]?.data} />
              </ArenaCardContainer>
            )}
          </>
        ) : (
          <BlankCard value={"Drugi Pokemon"} />
        )}
      </ArenaContainer>
      {firstFighter && secondFighter && (
        <ButtonContainer>
          <button onClick={fightResultFnc}>WALKA</button>
        </ButtonContainer>
      )}
    </ArenaBody>
  );
};

export default ArenaPage;
