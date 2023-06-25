import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { GlobalContext } from "./context/global";
import PokemonCard from "./PokemonCard";
import Loader from "./Loader";

import styled from "styled-components";

const Body = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ swich }) => (swich ? "#394867" : "#d4f1f4")};
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const Search = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
`;
//
const fetchPokemons = async () => {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=150"
  );
  const promise = response.data.results.map(async (pokemon) => {
    const details = await axios.get(pokemon.url);
    return {
      id: details.data.id,
      name: details.data.name,
      weight: details.data.weight,
      height: details.data.height,
      ability: details.data.abilities[0].ability.name,
      base_exp: details.data.base_experience,
      img: details.data.sprites.other["official-artwork"].front_default,
      type: details.data.types[0].type.name,
      favorite: false,
      edited: false,
      fight: false,
      isSaved: false,
      wins: 0,
      lose: 0,
    };
  });
  const originalPokemons = await Promise.all(promise);

  // Fetch the edited pokemons
  const editedResponse = await axios.get("http://localhost:3000/pokemons");
  const editedPokemons = editedResponse.data;

  // Map the edited pokemons by id
  const editedPokemonsById = editedPokemons.reduce((map, pokemon) => {
    map[pokemon.id] = pokemon;
    return map;
  }, {});

  // Map the edited pokemons by name
  const editedPokemonsByName = editedPokemons.reduce((map, pokemon) => {
    map[pokemon.name] = pokemon;
    return map;
  }, {});

  // Replace the original pokemons with the edited ones
  let allPokemons = originalPokemons.map((pokemon) => {
    if (editedPokemonsById[pokemon.id]) {
      return editedPokemonsById[pokemon.id];
    } else if (editedPokemonsByName[pokemon.name]) {
      return editedPokemonsByName[pokemon.name];
    } else {
      return pokemon;
    }
  });

  // Add new pokemons that were not in the original API
  editedPokemons.forEach((editedPokemon) => {
    if (!allPokemons.find((pokemon) => pokemon.id === editedPokemon.id)) {
      allPokemons.push(editedPokemon);
    }
  });

  return allPokemons;
};

//

const FetchData = () => {
  const [value, setValue] = useState("");
  const { pokemons, setPokemons, swich } = useContext(GlobalContext);
  const { data, isLoading, isError, error } = useQuery(
    "pokemons",
    fetchPokemons,
    {
      onSuccess: (data) => {
        setPokemons(data);
        console.log(data);
      },
    }
  );

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  const filtredPokemons = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <Body swich={swich}>
      <Search>
        <input
          style={{
            padding: ".7rem",
            border: "2px solid #2E8BC0",
            borderRadius: "5px",
            backgroundColor: "transparent",
          }}
          type="text"
          placeholder="Search Pokemon..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Search>

      <CardsContainer>
        {pokemons &&
          filtredPokemons.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))}
      </CardsContainer>
    </Body>
  );
};

export default FetchData;
