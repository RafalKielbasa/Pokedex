import React, { useEffect, useState, useContext } from "react";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";
import { SearchContext } from "./SearchContext";
import { useFavorite } from "./FavoritesContext";
import { Message } from "semantic-ui-react";

const PokemonsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px;
`;

const PokemonsCards = () => {
  const [pokemons, setPokemons] = useState([]);
  const { search } = useContext(SearchContext);
  const { error, closeError } = useFavorite();

  const fetchPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500");
    const data = await response.json();
    const results = await Promise.all(
      data.results.map(async (result) => {
        const response = await fetch(result.url);
        return await response.json();
      })
    );
    setPokemons(results);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {error && (
        <Message
          negative
          className="ui huge message"
          onDismiss={closeError}
          header="This pokemon is already in your favorites !   "
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            zIndex: 1000,
          }}
        />
      )}
      <PokemonsGrid>
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </PokemonsGrid>
    </>
  );
};

export default PokemonsCards;
