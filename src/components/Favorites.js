import React, { useContext } from "react";
import styled from "styled-components";
import { FavoriteContext } from "./FavoritesContext";
import FavoriteCard from "./FavoriteCard";

const FavoritesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px;
`;

const Favorites = () => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <FavoritesGrid>
      {favorites.length === 0 ? (
        <div>Nothing here</div>
      ) : (
        favorites.map((pokemon) => (
          <FavoriteCard key={pokemon.id} pokemon={pokemon} />
        ))
      )}
    </FavoritesGrid>
  );
};

export default Favorites;
