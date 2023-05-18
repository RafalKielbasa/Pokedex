import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useTheme } from "@mui/material";
import styled, { css } from "styled-components";

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
      margin: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: ${theme.palette.background.default};
    `
);

const FightButton = styled("button")(
  ({ theme }) =>
    css`
      border: 1px solid red;
      width: 40vw;
      color: red;
      margin: 1rem auto;
      cursor: pointer;
      font-size: 30px;
      background-color: ${theme.palette.background.contrast};
    `
);

const HomeButton = styled("button")(
  ({ theme, winner }) =>
    css`
      border: 1px solid red;
      width: 40vw;
      color: red;
      margin: 1rem auto;
      cursor: pointer;
      font-size: 30px;
      background-color: ${theme.palette.background.contrast};
      visibility: ${winner !== undefined ? "visible" : "hidden"};
    `
);

const Arena = ({ battle, setBattle }) => {
  const [winner, setWinner] = useState(undefined);
  const [listener, setListener] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:3001/battle")
      .then((response) => setBattle(response.data));
  }, [listener]);

  const playerOne = battle[0];
  const playerTwo = battle[1];

  const playerOneName = playerOne?.name;
  const playerTwoName = playerTwo?.name;

  const playerOneForce = playerOne?.base_experience * playerOne?.height;
  const playerTwoForce = playerTwo?.base_experience * playerTwo?.height;

  const handleFight = () => {
    if (playerOneForce > playerTwoForce) {
      setWinner(playerOne);
      updateData(playerOne);
    } else if (playerOneForce < playerTwoForce) {
      setWinner(playerTwo);
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
    <Container theme={theme}>
      {winner ? <h1>winner {winner.name.toUpperCase()} !</h1> : null}
      <CardsContainer>
        <StyledBox
          theme={theme}
          winner={winner}
          style={{
            opacity: winner
              ? winner.name === playerOne.name
                ? "1"
                : "0.3"
              : null,
          }}
        >
          {playerOne?.id !== undefined ? (
            <PokemonCard
              pokemon={playerOne}
              key={playerOneName}
              closebutton={true}
              removeFighter={() => removeFighter(playerOne.id)}
            />
          ) : null}
        </StyledBox>

        <StyledBox
          theme={theme}
          style={{
            opacity: winner
              ? winner.name === playerTwo.name
                ? "1"
                : "0.3"
              : null,
          }}
        >
          {playerTwo?.id !== undefined ? (
            <PokemonCard
              pokemon={playerTwo}
              key={playerTwoName}
              closebutton={true}
              removeFighter={() => removeFighter(playerTwo.id)}
            />
          ) : null}
        </StyledBox>
      </CardsContainer>
      <FightButton
        onClick={handleFight}
        theme={theme}
        disabled={battle.length > 1 ? false : true}
      >
        FIGHT
      </FightButton>
      <Link to={"/"}>
        <HomeButton onClick={backHome} winner={winner?.name} theme={theme}>
          Back Home
        </HomeButton>
      </Link>
    </Container>
  );
};

export default Arena;
