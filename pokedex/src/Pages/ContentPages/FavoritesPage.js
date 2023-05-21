import React from "react";
import { useQueries } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchPokemonQueriesData } from "src/api/fetchDataFunctions";
import { FavoriteCard, PokemonCardContainer } from "../components";
const FavoritesPage = () => {
  const { favoriteList } = useOutletContext();

  const { data: favorite } = useQueries({
    queries: favoriteList?.map(({ name, url }) => {
      return {
        queryKey: ["pokemon", name],
        queryFn: () => fetchPokemonQueriesData(url),
        enabled: favoriteList.length > 0,
        staleTime: 10 * (60 * 1000),
      };
    }),
  });
  return (
    <PokemonCardContainer>
      {Array.isArray(favorite?.data) &&
        favorite?.data?.map((value) => (
          <FavoriteCard key={value?.id} id={value?.id} value={value} />
        ))}
    </PokemonCardContainer>
  );
};

export default FavoritesPage;
