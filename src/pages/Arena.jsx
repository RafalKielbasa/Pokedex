import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.background.contrast};
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledBox = styled.div`
  width: 300px;
  height: 400px;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FightButton = styled.button`
  border: 1px solid red;
  width: 40vw;
  color: red;
  margin: 1rem auto;
  cursor: pointer;
  font-size: 30px;
  background-color: ${({ theme }) => theme.palette.background.contrast};
`;

const HomeButton = styled.button`
  border: 1px solid red;
  width: 40vw;
  color: red;
  margin: 1rem auto;
  cursor: pointer;
  font-size: 30px;
  background-color: ${({ theme }) => theme.palette.background.contrast};
  visibility: ${({ winner }) => (winner !== null ? "visible" : "hidden")};
`;

export default function Arena({ battle, setBattle }) {
  const [winner, setWinner] = useState(null);
  const [listener, setListener] = useState(true);

  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:3001/battle")
      .then((response) => setBattle(response.data));
  }, [listener]);

  const fight = () => {
    console.log(battle);
    if (
      battle.length > 1 &&
      battle[0].base_experience * battle[0].height >
        battle[1].base_experience * battle[1].height
    ) {
      setWinner(battle[0].name);
      axios.put(`http://localhost:3001/pokemon/${battle[0].id}`, {
        ...battle[0],
        base_experience: battle[0].base_experience + 10,
      });
    } else if (
      battle.length > 1 &&
      battle[0].base_experience * battle[0].height <
        battle[1].base_experience * battle[1].height
    ) {
      setWinner(battle[1].name);
      axios.put(`http://localhost:3001/pokemon/${battle[1].id}`, {
        ...battle[1],
        base_experience: battle[1].base_experience + 10,
      });
    } else {
      console.log("brak drugiego gracza");
    }
  };

  const removeFighter = (index) => {
    axios.delete(`http://localhost:3001/battle/${index}`);
    setListener(!listener);
  };

  const backHome = () => {
    axios.delete(`http://localhost:3001/battle/${battle[0].id}`);
    axios.delete(`http://localhost:3001/battle/${battle[1].id}`);
    setListener(!listener);
  };

  return (
    <Container theme={theme}>
      {winner ? <h1>winner {winner.toUpperCase()} !</h1> : null}
      <CardsContainer>
        <StyledBox
          theme={theme}
          style={{
            backgroundColor: theme.palette.background.default,
            opacity: winner ? (winner === battle[0].name ? "1" : "0.3") : null,
          }}
        >
          {battle[0]?.id !== undefined ? (
            <Card
              url={`https://pokeapi.co/api/v2/pokemon/${battle[0].id}/`}
              key={battle[0]}
              closebutton={true}
              removeFighter={() => removeFighter(battle[0].id)}
            />
          ) : (
            <StyledBox></StyledBox>
          )}
        </StyledBox>

        <StyledBox
          style={{
            backgroundColor: theme.palette.background.default,
            opacity: winner ? (winner === battle[1].name ? "1" : "0.3") : null,
          }}
        >
          {battle[1]?.id !== undefined ? (
            <Card
              url={`https://pokeapi.co/api/v2/pokemon/${battle[1].id}/`}
              key={battle[1]}
              closebutton={true}
              removeFighter={() => removeFighter(battle[1].id)}
            />
          ) : (
            <StyledBox></StyledBox>
          )}
        </StyledBox>
      </CardsContainer>
      <FightButton onClick={fight} theme={theme} winner={winner}>
        FIGHT
      </FightButton>
      <Link to={"/"}>
        <HomeButton onClick={backHome} winner={winner} theme={theme}>
          Back Home
        </HomeButton>
      </Link>
    </Container>
  );
}
