import { PokemonWrapper } from "../HomePageWrapper/HomePageWrapper.styles";
import { PageWrapper } from "../PokemonDetailsWrapper/PokemonDetailsWrapper.style";
import { useFavoritesQuery } from "../../../hooks/useFavorites";
import { useAllFavoritesPokemonDataQuery } from "../../../hooks/useAllFavoritesPokemonData";
import { PokemonCard } from "../../PokemonCard/PokemonCard";
import { H1 } from "./Favorite.style";
import { v4 } from "uuid";
import { useState } from "react";

export const Favorite = () => {
  const { data: favoritesPokemon } = useFavoritesQuery(
    parseInt(localStorage.getItem("Pokedex-user"))
  );
  const { data: favoritesPokemonData } =
    useAllFavoritesPokemonDataQuery(favoritesPokemon);

  console.log(favoritesPokemonData);

  if (favoritesPokemonData?.length === 0) {
    return <H1>There's nothing here yet</H1>;
  } else {
    return (
      <PageWrapper>
        <PokemonWrapper>
          {favoritesPokemonData?.map((pokemon) => {
            return <PokemonCard key={v4()} props={pokemon?.value?.data} />;
          })}
        </PokemonWrapper>
      </PageWrapper>
    );
  }
};
