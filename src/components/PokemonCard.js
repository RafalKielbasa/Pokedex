import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid black;
  border-radius: 6px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
`;

const PokemonCard = ({ pokemon }) => {
  return (
    <Card>
      <img
        style={{ width: "150px", height: "150px" }}
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <TypesGrid>
        <p>🆔 {pokemon.id}</p>
        <p>❤️ {pokemon.stats[0].base_stat}</p>
        <p>⚔️ {pokemon.stats[1].base_stat}</p>
        <p>🛡️ {pokemon.stats[2].base_stat}</p>
      </TypesGrid>
    </Card>
  );
};

export default PokemonCard;
