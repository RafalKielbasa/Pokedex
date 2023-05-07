import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material";
import Card from "../components/Card";
import { useSnackbar } from "notistack";
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
  text-align: center;
  color: red;
  margin: 1rem auto;
  cursor: pointer;
  font-size: 30px;
`;

export default function Arena({ battle, setBattle }) {
  const [playerOneForce, setPlayerOneForce] = useState();
  const [playerTwoForce, setPlayerTwoForce] = useState();
  const [winner, setWinner] = useState("");
  const [listener, setListener] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/battle")
      .then((response) =>
        setBattle(
          response.data?.map((item) => {
            console.log(item);
            return item.id;
          })
        )
      )
      .catch((error) => console.log(error));
  }, [listener]);

  const fight = () => {
    if (battle.length > 1 && playerOneForce[0] > playerTwoForce[0]) {
      setWinner(playerOneForce[1]);
    } else if (battle.length > 1 && playerOneForce[0] < playerTwoForce[0]) {
      setWinner(playerTwoForce[1]);
    } else {
      console.log("brak drugiego gracza");
    }
  };
  const handleClick = (text, type) => {
    enqueueSnackbar(text, { variant: type });
  };

  const removeFighter = (index) => {
    console.log("usuwamy", battle[0]);
    axios.delete(`http://localhost:3001/battle/${index}`);
    setListener(!listener);
    handleClick("Removed Pokemon from battle", "error");
  };

  const backHome = (index) => {
    console.log("usuwamy", battle[0]);
    axios.delete(`http://localhost:3001/battle/${battle[0]}`);
    axios.delete(`http://localhost:3001/battle/${battle[1]}`);
    setListener(!listener);
  };

  return (
    <Container
      style={{
        backgroundColor: theme.palette.background.contrast,
      }}
    >
      {winner ? (
        <h2 style={{ marginTop: "20px" }}>winner {winner.toUpperCase()} !</h2>
      ) : null}
      <CardsContainer>
        <StyledBox
          style={{
            backgroundColor: theme.palette.background.default,
            opacity: winner ? (winner === playerOneForce[1] ? 1 : 0.3) : null,
          }}
        >
          {battle[0] ? (
            <Card
              key={battle[0]}
              url={`https://pokeapi.co/api/v2/pokemon/${battle[0]}/`}
              force={setPlayerOneForce}
              closebutton={true}
              removeFighter={() => removeFighter(battle[0])}
            />
          ) : (
            <StyledBox></StyledBox>
          )}
        </StyledBox>

        <StyledBox
          style={{
            backgroundColor: theme.palette.background.default,
            opacity: winner ? (winner === playerTwoForce[1] ? 1 : 0.3) : null,
          }}
        >
          {battle[1] ? (
            <Card
              key={battle[1]}
              url={`https://pokeapi.co/api/v2/pokemon/${battle[1]}/`}
              force={setPlayerTwoForce}
              closebutton={true}
              removeFighter={() => removeFighter(battle[1])}
            />
          ) : (
            <StyledBox></StyledBox>
          )}
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
      <Link to={"/"}>
        <FightButton
          onClick={backHome}
          style={{
            backgroundColor: theme.palette.background.contrast,
            visibility: winner
              ? winner === playerOneForce[1] || winner === playerTwoForce[1]
                ? "visible"
                : "hidden"
              : "hidden",
          }}
        >
          Back Home
        </FightButton>
      </Link>
    </Container>
  );
}
