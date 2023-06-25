import React, { useContext } from "react";
import { GlobalContext } from "./context/global";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";
import axios from "axios";

const Button = styled.button`
  width: 250px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${({ swich }) => (swich ? "#03001C" : "#007bff")};
  color: white;
  font-weight: 700;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d4f1f4;
  min-height: 100vh;
  background-color: ${({ swich }) => (swich ? "#394867" : "#d4f1f4")};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px;
  margin-top: 20px;
`;

const FavoriteCard = () => {
  const { pokemons, setPokemons, swich } = useContext(GlobalContext);

  const favoritePokemons = pokemons.filter((pokemon) => pokemon.favorite);

  const deleteAllFavorites = () => {
    favoritePokemons.forEach((pokemon) => {
      axios
        .patch(`http://localhost:3000/pokemons/${pokemon.id}`, {
          ...pokemon,
          favorite: false,
        })
        .then((res) => {
          setPokemons((prevPokemons) =>
            prevPokemons.map((p) =>
              p.id === pokemon.id ? { ...p, favorite: false } : p
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <Body swich={swich}>
      <ButtonContainer>
        <Button
          swich={swich}
          onClick={deleteAllFavorites}
          disabled={favoritePokemons.length < 1}
        >
          Delete All Favorites
        </Button>
      </ButtonContainer>
      <CardContainer>
        {favoritePokemons &&
          favoritePokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
      </CardContainer>
    </Body>
  );
};

export default FavoriteCard;
