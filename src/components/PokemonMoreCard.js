import { useParams } from "react-router";
import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";

const Wprapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const PokemonMoreCard = () => {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonName } = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [pokemonName]);

  if (!pokemon || !pokemon.sprites) return <div>Pokemon not found :C</div>;

  return (
    <Wprapper>
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      {/* ...and so on, for other details */}
    </Wprapper>
  );
};

export default PokemonMoreCard;
