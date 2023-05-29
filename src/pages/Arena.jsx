import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { css, styled } from "@mui/material";

import PokemonCard from "../components/PokemonCard";

const Container = styled("div")(
  ({ theme }) =>
    css`
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: ${theme.palette.background.contrast};
    `
);

const CardsContainer = styled("div")(
  css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `
);

const StyledBox = styled("div")(
  ({ theme }) =>
    css`
      width: 300px;
      height: 400px;
      margin: 40px;
      border-radius: 12px;
      transition: 500ms all;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: ${theme.palette.background.default};
    `
);

const WinnerInfo = styled("h1")(
  css`
    color: black;
    font-size: 50px;
  `
);

const FightButton = styled("button")(
  ({ theme, winner }) =>
    css`
      border: 1px solid red;
      width: 20vw;
      color: red;
      margin: 1rem auto;
      cursor: pointer;
      font-size: 30px;
      background-color: ${theme.palette.background.contrast};
      visibility: ${winner === undefined ? "visible" : "hidden"};
    `
);

const HomeButton = styled("button")(
  ({ theme, winner }) =>
    css`
      border: 1px solid red;
      width: 20vw;
      color: red;
      margin: 1rem auto;
      cursor: pointer;
      font-size: 30px;
      background-color: ${theme.palette.background.contrast};
      visibility: ${winner !== undefined ? "visible" : "hidden"};
    `
);

const Arena = () => {
  const [battle, setBattle] = useState([]);
  const [winner, setWinner] = useState(undefined);
  const [listener, setListener] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/battle")
      .then((response) => setBattle(response.data));
  }, [listener]);

  const playerOne = battle[0];
  const playerTwo = battle[1];

  const playerOneName = battle[0]?.name;
  const playerTwoName = battle[1]?.name;

  const handleFight = () => {
    const playerOneForce = playerOne?.base_experience * playerOne?.weight;
    const playerTwoForce = playerTwo?.base_experience * playerTwo?.weight;

    if (playerOneForce > playerTwoForce) {
      setWinner(playerOneName);
      updateData(playerOne);
    } else if (playerOneForce < playerTwoForce) {
      setWinner(playerTwoName);
      updateData(playerTwo);
    } else {
      setWinner("DRAW");
    }
  };

  const updateData = (winner) => {
    axios.put(`http://localhost:3001/editedPokemon/${winner.id}`, {
      ...winner,
      base_experience: winner.base_experience + 10,
    });
    axios.post(`http://localhost:3001/battleHistory/`, {
      playerOneName,
      playerTwoName,
      winner: winner?.name,
    });
  };

  const removeFighter = (index) => {
    axios.delete(`http://localhost:3001/battle/${index}`);
    setListener(!listener);
  };

  const backHome = () => {
    axios.delete(`http://localhost:3001/battle/${playerOne.id}`);
    axios.delete(`http://localhost:3001/battle/${playerTwo.id}`);
    setListener(!listener);
  };

  return (
    <Container>
      {winner && <WinnerInfo>{winner?.toUpperCase()} !</WinnerInfo>}
      <CardsContainer>
        <StyledBox
          winner={winner}
          style={{
            opacity: winner ? (winner === playerOneName ? "1" : "0.3") : null,
          }}
        >
          {playerOne && (
            <PokemonCard
              pokemon={playerOne}
              closebutton={true}
              removeFighter={() => removeFighter(playerOne.id)}
            />
          )}
        </StyledBox>

        <StyledBox
          style={{
            opacity: winner ? (winner === playerTwoName ? "1" : "0.3") : null,
          }}
        >
          {playerTwo && (
            <PokemonCard
              pokemon={playerTwo}
              closebutton={true}
              removeFighter={() => removeFighter(playerTwo.id)}
            />
          )}
        </StyledBox>
      </CardsContainer>
      <FightButton
        winner={winner}
        onClick={handleFight}
        disabled={battle.length <= 1}
      >
        FIGHT
      </FightButton>
      <Link to={"/"}>
        <HomeButton onClick={backHome} winner={winner}>
          Back Home
        </HomeButton>
      </Link>
    </Container>
  );
};

export default Arena;
