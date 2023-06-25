import React, { useContext, useState } from "react";
import { GlobalContext } from "./context/global";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  width: 250px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${({ swich }) => (swich ? "#03001C" : "#007bff")};
  color: white;
  font-weight: 700;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ swich }) => (swich ? "#394867" : "#d4f1f4")};
  min-height: 100vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px;
  margin-top: 20px;
`;

const WinnerLoserInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  font-weight: bold;
`;
const calcStats = (pokemon) => {
  let baseExp = pokemon.base_exp;
  let weight = pokemon.weight;
  return baseExp * weight;
};

const FightArena = () => {
  const { pokemons, setPokemons, loser, setLoser, swich } =
    useContext(GlobalContext);
  const [winner, setWinner] = useState([]);
  const [leaveButton, setLeaveButton] = useState(1);
  const navigate = useNavigate();

  const fightPokemons = pokemons.filter((pokemon) => pokemon.fight === true);
  console.log(`to jest fightPokemons:`, fightPokemons);

  const fight = () => {
    let pokemon1 = fightPokemons[0];
    let pokemon2 = fightPokemons[1];

    console.log(`poke1`, pokemon1, `poke2`, pokemon2);

    let poke1Stats = calcStats(pokemon1);
    let poke2Stats = calcStats(pokemon2);

    if (poke1Stats > poke2Stats) {
      setWinner(pokemon1.name);
      setLoser(pokemon2.name);
      uptadeWinsPokemons(pokemon1);
      updateLoserData(pokemon2);
      setLeaveButton(0);
    } else if (poke1Stats < poke2Stats) {
      setWinner(pokemon2.name);
      setLoser(pokemon1.name);
      uptadeWinsPokemons(pokemon2);
      updateLoserData(pokemon1);
      setLeaveButton(0);
    } else {
      setWinner("Remis");
      setLoser(null);
      setLeaveButton(0);
    }
  };

  const uptadeWinsPokemons = (winnerPokemon) => {
    winnerPokemon.base_exp += 10;
    winnerPokemon.wins += 1;

    axios
      .patch(`http://localhost:3000/pokemons/${winnerPokemon.id}`, {
        ...winnerPokemon,
        base_exp: winnerPokemon.base_exp,
        wins: winnerPokemon.wins,
      })
      .then((res) => {
        setPokemons((prevPokemons) =>
          prevPokemons.map((p) =>
            p.id === winnerPokemon.id
              ? {
                  ...p,
                  base_exp: winnerPokemon.base_exp,
                  wins: winnerPokemon.wins,
                }
              : p
          )
        );
      })
      .catch((error) => console.log(error));
  };

  const updateLoserData = (loserPokemon) => {
    loserPokemon.lose += 1;
    axios
      .patch(`http://localhost:3000/pokemons/${loserPokemon.id}`, {
        ...loserPokemon,
        lose: loserPokemon.lose,
      })
      .then((res) => {
        setPokemons((prevPokemons) =>
          prevPokemons.map((p) =>
            p.id === loserPokemon.id
              ? {
                  ...p,
                  lose: loserPokemon.lose,
                }
              : p
          )
        );
      })
      .catch((error) => console.log(error));
  };

  const deleteAllFight = () => {
    fightPokemons.forEach((pokemon) => {
      axios
        .patch(`http://localhost:3000/pokemons/${pokemon.id}`, {
          ...pokemon,
          fight: false,
        })
        .then((res) => {
          setPokemons((prevPokemons) =>
            prevPokemons.map((p) =>
              p.id === pokemon.id ? { ...p, fight: false } : p
            )
          );
          setWinner(null);
          setLoser(null);
          setLeaveButton(1);
        })
        .catch((error) => console.log(error));
    });
  };

  const navigateToHome = () => {
    setLeaveButton(1);
    navigate("/");
    setWinner(null);
    setLoser(null);
    deleteAllFight();
  };

  return (
    <Body swich={swich}>
      <ButtonContainer>
        <Button
          swich={swich}
          onClick={deleteAllFight}
          disabled={fightPokemons.length < 1}
        >
          Delete All
        </Button>
        <Button
          swich={swich}
          onClick={fight}
          disabled={fightPokemons.length < 2}
        >
          COMBAT
        </Button>
        {leaveButton === 0 ? (
          <Button swich={swich} onClick={navigateToHome}>
            LEAVE ARENA
          </Button>
        ) : null}
      </ButtonContainer>
      <WinnerLoserInfo>
        <p>Winner:{winner && winner}</p>

        <p>Loser: {loser && loser}</p>
      </WinnerLoserInfo>
      <CardContainer>
        {fightPokemons &&
          fightPokemons.map((pokemon) => (
            <div key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
              <p>Winns: {pokemon.wins}</p>
              <p>Lose: {pokemon.lose}</p>
            </div>
          ))}
      </CardContainer>
    </Body>
  );
};

export default FightArena;
