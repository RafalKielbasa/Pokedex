import React, { useState, useContext } from "react";
import { BlankCard, ArenaCard } from "src/components";
import styled from "styled-components";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { VS, Winner } from "src/img";
import { arenaFirstOneActionHandle, arenaSecondOneActionHandle } from "src/api/postDataFunctions";
import { fighterPowerLevel } from "src/helpers";
import { fetchOnePokemon } from "src/api/fetchDataFunctions";
import GlobalContext from "src/context/GlobalContext";
const ArenaBody = styled.div`
  background: url(${(prop) => prop.theme.arenaBgImg});
  min-height: 82.5vh;
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
const ArenaPage = () => {
  const { theme } = useContext(GlobalContext);
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
      arenaFirstOneActionHandle(
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
      arenaSecondOneActionHandle(
        secondFighter,
        arenaSecondFighter,
        firstFighterPowerLevel,
        secondFighterPowerLevel,
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

  return (
    <ArenaBody theme={theme}>
      <ArenaContainer>
        {firstFighterStatus === "success" && !isFirstPokemonDeleted ? (
          <>
            {fightResult === "first" ? (
              <ArenaCardContainer>
                <img src={Winner} alt="Winner" width={"200px"} height={"200px"} />
                <ArenaCard
                  value={firstFighter}
                  deleteFighter={() =>
                    deleteFighter(setArenaFirstFighter, setIsFirstPokemonDeleted)
                  }
                />
              </ArenaCardContainer>
            ) : (
              <ArenaCardContainer>
                <ArenaCard
                  value={firstFighter}
                  deleteFighter={() =>
                    deleteFighter(setArenaFirstFighter, setIsFirstPokemonDeleted)
                  }
                />
              </ArenaCardContainer>
            )}
          </>
        ) : (
          <BlankCard value={"Pierwszy Pokemon"} />
        )}
        <img src={VS} alt="VS" width={"250px"} height={"250px"} />
        {secondFighterStatus === "success" && !isSecondPokemonDeleted ? (
          <>
            {fightResult === "second" ? (
              <ArenaCardContainer>
                <img src={Winner} alt="Winner" width={"200px"} height={"200px"} />
                <ArenaCard
                  value={secondFighter}
                  deleteFighter={() =>
                    deleteFighter(setArenaSecondFighter, setIsSecondPokemonDeleted)
                  }
                />
              </ArenaCardContainer>
            ) : (
              <ArenaCardContainer>
                <ArenaCard
                  value={secondFighter}
                  deleteFighter={() =>
                    deleteFighter(setArenaSecondFighter, setIsSecondPokemonDeleted)
                  }
                />
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
