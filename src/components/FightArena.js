import React, { useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import { FightArenaContext } from "./FightArenaContext";
import { typeColor } from "./FavoriteCard";

const Card = styled.div`
  margin: 10px;
  border-radius: 6px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ type }) => typeColor(type)};
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const TypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 15px;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Info = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const calculateStats = (pokemon) => {
  let total = 0;
  pokemon.stats.forEach((stat) => {
    total += stat.base_stat;
  });
  return total / pokemon.stats.length;
};

const FightArena = () => {
  const { fightArena, clearArena, winner, setWinner } =
    useContext(FightArenaContext);

  const fight = () => {
    if (fightArena.length < 2) {
      alert("Dodaj dwa Pokemony do areny");
      return;
    }

    const pokemon1 = fightArena[0];
    const pokemon2 = fightArena[1];

    const pokemon1Stats = calculateStats(pokemon1);
    const pokemon2Stats = calculateStats(pokemon2);

    if (pokemon1Stats > pokemon2Stats) {
      setWinner(pokemon1.name);
    } else if (pokemon1Stats < pokemon2Stats) {
      setWinner(pokemon2.name);
    } else {
      setWinner("Remis");
    }
  };

  return (
    <>
      <Header>
        <Button disabled={fightArena.length < 2 ? true : false} onClick={fight}>
          COMBAT
        </Button>
        {winner && <h2>🏆Wygrał: {winner}🏆</h2>}
        <Button
          disabled={fightArena.length === 0 ? true : false}
          onClick={clearArena}
        >
          Clear Arena
        </Button>
      </Header>
      {fightArena.length === 0 ? (
        <Info>No pokemon in fight arena.</Info>
      ) : (
        <Wrapper>
          {fightArena.map((pokemon) => (
            <Card key={pokemon.id} type={pokemon?.types[0].type.name}>
              <img
                style={{ width: "150px", height: "150px" }}
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
              <h2>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
              <TypesGrid>
                <p>🆔 {pokemon.id}</p>
                <p>❤️ {pokemon.stats[0].base_stat}</p>
                <p>⚔️ {pokemon.stats[1].base_stat}</p>
                <p>🛡️ {pokemon.stats[2].base_stat}</p>
              </TypesGrid>
            </Card>
          ))}
        </Wrapper>
      )}
    </>
  );
};

export default FightArena;
