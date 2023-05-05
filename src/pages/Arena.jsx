import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SportsMmaRoundedIcon from "@mui/icons-material/SportsMmaRounded";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material";
import Card from "../components/Card";
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledBox = styled.div`
  width: 300px;
  height: auto;
  margin: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FightButton = styled.button`
  border: 1px solid red;
  width: 40vw;
  text-align: center;
  color: red;
  margin: 1rem auto;
  cursor: pointer;
  font-size: 30px;
`;

export default function Arena({ battle, setBattle }) {
  const [playerOneForce, setPlayerOneForce] = useState("");
  const [playerTwoForce, setPlayerTwoForce] = useState("");
  const [winner, setWinner] = useState("");

  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  const fight = () => {
    console.log("walka");
    console.log("styat", playerOneForce);
    console.log("styat", playerTwoForce);

    if (battle.length > 1 && playerOneForce > playerTwoForce) {
      console.log("wygrywa ", battle[0]);
      setWinner(battle[0]);
    } else if (battle.length > 1 && playerOneForce < playerTwoForce) {
      console.log("wygrywa ", battle[1]);
      setWinner(battle[1]);
    } else {
      console.log("brak drugiego gracza");
      console.log("asd", battle.length);
    }
  };

  return (
    <Container
      style={{
        backgroundColor: theme.palette.background.contrast,
      }}
    >
      <CardsContainer>
        <StyledBox
          style={{
            backgroundColor: theme.palette.background.default,
            opacity: winner ? (winner === battle[0] ? 1 : 0.3) : null,
          }}
        >
          {battle[0] ? (
            <Card
              key={battle[0]}
              url={`https://pokeapi.co/api/v2/pokemon/${battle[0]}/`}
              force={setPlayerOneForce}
              style={{}}
            />
          ) : null}
        </StyledBox>
        <StyledBox
          style={{
            backgroundColor: theme.palette.background.default,
            opacity: winner ? (winner === battle[1] ? 1 : 0.3) : null,
          }}
        >
          {battle[1] ? (
            <Card
              key={battle[1]}
              url={`https://pokeapi.co/api/v2/pokemon/${battle[1]}/`}
              force={setPlayerTwoForce}
            />
          ) : null}
        </StyledBox>
      </CardsContainer>
      <FightButton
        onClick={fight}
        style={{
          backgroundColor: theme.palette.background.contrast,
        }}
      >
        FIGHT
      </FightButton>
    </Container>
  );
}
