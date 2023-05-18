import React from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { useFavorite } from "./FavoritesContext";
import { useContext } from "react";
import { FightArenaContext } from "./FightArenaContext";

export const typeColor = (type) => {
  switch (type) {
    case "grass":
      return "lightgreen";
    case "fire":
      return "rgba(210, 26, 43, 0.89)";
    case "water":
      return "lightblue";
    case "electric":
      return "yellow";
    case "poison":
      return "#B728FB";
    case "normal":
      return " rgba(10, 9, 9, 0.42)";
    case "psychic":
      return "rgba(224, 19, 109, 0.69)";
    case "ground":
      return "rgba(171, 128, 41, 0.69)";
    case "bug":
      return "rgba(172, 216, 53, 0.69)";
    case "rock":
      return "#5A4D41";
    case "fairy":
      return "#d8bfd8";
    case "fighting":
      return "#c65747";
    case "ghost":
      return "#8f5dcd";
    case "dragon":
      return "#45267b";
    case "dark":
      return "#4b3d17";
    case "steel":
      return "#9b9c9d";
    case "ice":
      return "#0fffff";
    case "flying":
      return "#87CEEB";
  }
};

const Card = styled.div`
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

const FavoriteCard = ({ pokemon }) => {
  const { removeFavorite } = useFavorite();
  const { addPokemonToFightArena } = useContext(FightArenaContext);

  return (
    <>
      <Card type={pokemon?.types[0].type.name}>
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
        <Button
          size="small"
          style={{ border: "1px solid black", background: "transparent" }}
          onClick={() => addPokemonToFightArena(pokemon)}
          className="ui labeled button"
          tabindex="0"
        >
          <div
            class="ui button"
            style={{
              background: "transparent",
              color: "palevioletred",
              fontWeight: "bolder",
              fontSize: "20px",
            }}
          >
            ⚔️FIGHT⚔️
          </div>
        </Button>
      </Card>
    </>
  );
};

export default FavoriteCard;
