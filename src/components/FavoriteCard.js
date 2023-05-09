import React from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { useFavorite } from "./FavoritesContext";

const Card = styled.div`
  border: 1px solid black;
  border-radius: 6px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const TypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
`;

const FavoriteCard = ({ pokemon }) => {
  const { removeFavorite } = useFavorite();

  return (
    <>
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
        <Button
          size="small"
          style={{ border: "1px solid black", background: "transparent" }}
          onClick={() => removeFavorite(pokemon.id)}
          class="ui labeled button"
          tabindex="0"
        >
          <div class="ui button" style={{ background: "transparent" }}>
            <i class="trash icon"></i> Delete
          </div>
        </Button>
      </Card>
    </>
  );
};

export default FavoriteCard;
