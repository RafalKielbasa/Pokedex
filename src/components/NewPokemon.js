import React, { useContext } from "react";
import styled from "styled-components";
import { FavoriteContext } from "./FavoritesContext";
import { NewPokemonContext } from "./NewPokemonContext";
import { typeColor } from "./PokemonCard";
import { Button } from "semantic-ui-react";
const Card = styled.div`
  border-radius: 6px;
  width: 300px;
  height: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ type }) => typeColor(type)};
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: auto;

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

const NewPokemon = ({ pokemon }) => {
  const { newPokemon } = useContext(NewPokemonContext);
  const { addFavorite } = useContext(FavoriteContext);

  return (
    <div>
      {newPokemon.map((pokemon) => (
        <Card type={pokemon?.types[0].type.name} key={pokemon.id}>
          <img
            style={{ width: "150px", height: "150px" }}
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
          <h2>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <TypesGrid>
            <p>🆔 {pokemon.id.slice(0, 3)}</p>
            <p>❤️ {pokemon.stats[0].base_stat}</p>
            <p>⚔️ {pokemon.stats[1].base_stat}</p>
            <p>🛡️ {pokemon.stats[2].base_stat}</p>
          </TypesGrid>
          <Button
            size="small"
            style={{ border: "1px solid black", background: "transparent" }}
            onClick={() => addFavorite(pokemon)}
            class="ui labeled button"
            tabindex="0"
          >
            <div
              class="ui
button"
              style={{ background: "transparent" }}
            >
              <i class="heart icon"></i> Add to Favorite
            </div>
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default NewPokemon;
