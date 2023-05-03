import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Input } from "semantic-ui-react";
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

  if (isLoading)
    return (
      <div
        className="loader"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div class="ui active inverted dimmer">
          <div class="ui large text loader">Loading</div>
        </div>
      </div>
    );
  if (error) return <div>Error!</div>;

  const filtredPokemon = pokemon.filter((p) => {
    return p.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <>
      <div
        className="input"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <Input>
          <div class="ui icon input">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setValue(e.target.value)}
            />
            <i class="search icon"></i>
          </div>
        </Input>
      </div>
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
