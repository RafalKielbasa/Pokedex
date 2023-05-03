import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import PokemonCard from "./PokemonCard";

const PokemonsCards = () => {
  const [pokemon, setPokemon] = useState([]);
  const [value, setValue] = useState("");
  {
    /* const [loading, setLoading] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=1118`
 );*/
  }

  const { data, isLoading, error } = useQuery("pokemon", async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1010`
    );
    const data = await response.json();

    const pokemonsData = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        return pokemonData;
      })
    );

    setPokemon(pokemonsData);
    //setLoading(data.next);
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const filtredPokemon = pokemon.filter((p) => {
    return p.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <>
      <input
        type="text"
        placeholder="put put"
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          margin: "10px",
        }}
      >
        {filtredPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </>
  );
};

export default PokemonsCards;
