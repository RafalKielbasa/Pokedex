import React, { useState, useContext } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

import { BlankCard } from "src/components/cards";
import {
  FightActionButtons,
  FightResultCardContainer,
} from "src/components/exlusiveArenaPageComponents";

import { VS } from "src/img";

import { fighterPowerLevel } from "src/helpers";

import { fetchOnePokemon } from "src/api/fetchDataFunctions";
import { arenaPostActionHandle } from "src/api/postDataFunctions";

const ArenaBody = styled.div`
  background: url(${(prop) => prop.theme.arenaBgImg});
  min-height: 82.5vh;
`;

const ArenaContainer = styled.div`
  display: flex;
  height: 700px;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
    height: 100%;
    padding: 10px;
    gap: 25px;
  }
`;

const MyImg = styled.img`
  width: 250px;
  height: 250px;
  @media (max-width: 800px) {
    width: 150px;
    height: 150px;
  }
`;

const ArenaPage = () => {
  const { theme, ActiveBtnHandle } = useContext(GlobalContext);

  const navigate = useNavigate();

  const {
    editedList,
    editedStatus,
    arenaFirstFighter,
    arenaSecondFighter,
    setArenaFirstFighter,
    setArenaSecondFighter,
  } = useOutletContext();

  const queryClient = useQueryClient();

  const [fightResult, setFightResult] = useState("");
  const [isFirstPokemonDeleted, setIsFirstPokemonDeleted] = useState(false);
  const [isSecondPokemonDeleted, setIsSecondPokemonDeleted] = useState(false);

  const { data: firstFighter, status: firstFighterStatus } = useQuery({
    queryKey: ["pokemon", arenaFirstFighter],
    queryFn: () => fetchOnePokemon(editedList, arenaFirstFighter),
    enabled: arenaFirstFighter != null && editedStatus === "success",
    staleTime: 10 * (60 * 1000),
  });
  const { data: secondFighter, status: secondFighterStatus } = useQuery({
    queryKey: ["pokemon", arenaSecondFighter],
    queryFn: () => fetchOnePokemon(editedList, arenaSecondFighter),
    enabled: arenaSecondFighter != null && editedStatus === "success",
    staleTime: 10 * (60 * 1000),
  });
  const firstFighterPowerLevel = fighterPowerLevel(firstFighter);
  const secondFighterPowerLevel = fighterPowerLevel(secondFighter);

  const firstFighterMutation = useMutation({
    mutationFn: () =>
      arenaPostActionHandle(
        firstFighter,
        arenaFirstFighter,
        firstFighterPowerLevel,
        secondFighterPowerLevel,
        editedList
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["editedPokemons"]);
      queryClient.setQueryData(["pokemon", firstFighter?.name], data?.data);
    },
  });
  const secondFighterMutation = useMutation({
    mutationFn: () =>
      arenaPostActionHandle(
        secondFighter,
        arenaSecondFighter,
        secondFighterPowerLevel,
        firstFighterPowerLevel,
        editedList
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["editedPokemons"]);
      queryClient.setQueryData(["pokemon", secondFighter?.name], data?.data);
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

  const deleteFighter = (deltedPokemonId, deletedPokemonState) => {
    deltedPokemonId(null);
    deletedPokemonState(true);
  };
  const LeaveArenaHandle = () => {
    navigate(`/`);
    ActiveBtnHandle("Home");
    setFightResult("");
    setArenaFirstFighter(null);
    setArenaSecondFighter(null);
  };
  return (
    <ArenaBody theme={theme}>
      <ArenaContainer>
        {firstFighterStatus === "success" && !isFirstPokemonDeleted ? (
          <FightResultCardContainer
            winValue={firstFighter?.winCount}
            lossValue={firstFighter?.lossCount}
            tieValue={firstFighter?.tieCount}
            fighterValue={firstFighter}
            fightResult={fightResult}
            winnerValue={"first"}
            lostValue={"second"}
            deleteFighter={() => deleteFighter(setArenaFirstFighter, setIsFirstPokemonDeleted)}
          />
        ) : (
          <BlankCard value={"Pierwszy Pokemon"} />
        )}
        <MyImg src={VS} alt="VS" />
        {secondFighterStatus === "success" && !isSecondPokemonDeleted ? (
          <FightResultCardContainer
            winValue={secondFighter?.winCount}
            lossValue={secondFighter?.lossCount}
            tieValue={secondFighter?.tieCount}
            fighterValue={secondFighter}
            fightResult={fightResult}
            winnerValue={"second"}
            lostValue={"first"}
            deleteFighter={() => deleteFighter(setArenaSecondFighter, setIsSecondPokemonDeleted)}
          />
        ) : (
          <BlankCard value={"Drugi Pokemon"} />
        )}
      </ArenaContainer>
      {firstFighter && secondFighter && (
        <FightActionButtons
          fightResult={fightResult}
          fightResultFnc={fightResultFnc}
          setFightResult={setFightResult}
          ClickHandle={LeaveArenaHandle}
        />
      )}
    </ArenaBody>
  );
};

export default ArenaPage;
