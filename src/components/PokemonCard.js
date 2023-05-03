import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid black;
  border-radius: 6px;
  width: 300px;
  height: 400px;
`;

const PokemonCard = ({ pokemon }) => {
  return (
    <Card>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>
      <p>HP: {pokemon.stats[0].base_stat}</p>
      <p>Attack: {pokemon.stats[1].base_stat}</p>
    </Card>
  );
};

export default PokemonCard;
