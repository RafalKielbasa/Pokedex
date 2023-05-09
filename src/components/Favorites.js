import React, { useContext } from "react";
import styled from "styled-components";
import { FavoriteContext } from "./FavoritesContext";
import FavoriteCard from "./FavoriteCard";
import { SearchContext } from "./SearchContext";

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
  const { search } = useContext(SearchContext);

  const filtredFavorites = favorites.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FavoritesGrid>
      {filtredFavorites.length === 0 ? (
        <div>Nothing here</div>
      ) : (
        filtredFavorites.map((pokemon) => (
          <FavoriteCard key={pokemon.id} pokemon={pokemon} />
        ))
      )}
    </FavoritesGrid>
  );
};

export default Favorites;
