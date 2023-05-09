import React, { useContext } from "react";
import styled from "styled-components";
import { FavoriteContext, useFavorite } from "./FavoritesContext";
import FavoriteCard from "./FavoriteCard";
import { SearchContext } from "./SearchContext";
import { Button } from "semantic-ui-react";

const FavoritesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Favorites = () => {
  const { favorites } = useContext(FavoriteContext);
  const { search } = useContext(SearchContext);
  const { removeAll } = useFavorite();

  const filtredFavorites = favorites.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ButtonContainer>
        {filtredFavorites.length === 0 ? (
          <div></div>
        ) : (
          <Button
            className="ui negative basic button"
            onClick={() => removeAll()}
          >
            Remove All
          </Button>
        )}
      </ButtonContainer>
      <FavoritesGrid>
        {filtredFavorites.length === 0 ? (
          <div>Nothing here</div>
        ) : (
          filtredFavorites.map((pokemon) => (
            <FavoriteCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </FavoritesGrid>
    </>
  );
};

export default Favorites;
