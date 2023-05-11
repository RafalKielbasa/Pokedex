import React, { useState } from "react";
import { BlankCard, PokemonCard } from "./components";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { Stadium, VS, Winner } from "src/img";
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
}) => {
  const queryClient = useQueryClient();
  const [fightResult, setFightResult] = useState("");
  const [isFirstPokemonDeleted, setIsFirstPokemonDeleted] = useState(false);
  const [isSecondPokemonDeleted, setIsSecondPokemonDeleted] = useState(false);
  const firstFighter = queryClient.setQueryData(
    ["pokemon", firstPokemonId],
    (prev) => prev
  );
  const secondFighter = queryClient.setQueryData(
    ["pokemon", secondPokemonId],
    (prev) => prev
  );
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
  const deleteFighter = (action, deletedPokemonState) => {
    action(null);
    deletedPokemonState(true);
  };
  return (
    <ArenaBody>
      <ArenaContainer>
        {firstFighter && !isFirstPokemonDeleted ? (
          <>
            {fightResult === "first" ? (
              <ArenaCardContainer>
                <img
                  src={Winner}
                  alt="Winner"
                  width={"200px"}
                  height={"200px"}
                />
                <button
                  onClick={() =>
                    deleteFighter(firstPokemonAction, setIsFirstPokemonDeleted)
                  }
                >
                  USUŃ
                </button>
                <PokemonCard value={firstFighter} />
              </ArenaCardContainer>
            ) : (
              <ArenaCardContainer>
                <button
                  onClick={() =>
                    deleteFighter(firstPokemonAction, setIsFirstPokemonDeleted)
                  }
                >
                  USUŃ
                </button>
                <PokemonCard value={firstFighter} />
              </ArenaCardContainer>
            )}
          </>
        ) : (
          <BlankCard value={"Pierwszy Pokemon"} />
        )}
        <img src={VS} alt="VS" width={"200px"} height={"200px"} />
        {secondFighter && !isSecondPokemonDeleted ? (
          <>
            {fightResult === "second" ? (
              <ArenaCardContainer>
                <img
                  src={Winner}
                  alt="Winner"
                  width={"200px"}
                  height={"200px"}
                />
                <button
                  onClick={() =>
                    deleteFighter(
                      secondPokemonAction,
                      setIsSecondPokemonDeleted
                    )
                  }
                >
                  USUŃ
                </button>
                <PokemonCard value={secondFighter} />
              </ArenaCardContainer>
            ) : (
              <ArenaCardContainer>
                <button
                  onClick={() =>
                    deleteFighter(
                      secondPokemonAction,
                      setIsSecondPokemonDeleted
                    )
                  }
                >
                  USUŃ
                </button>
                <PokemonCard value={secondFighter} />
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
