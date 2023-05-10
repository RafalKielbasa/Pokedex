import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFavorite } from "src/api";
import { FavoriteCard, PokemonCardContainer } from "./components";
const FavoritesPage = () => {
  const { data: favorite } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => fetchFavorite(),
    cacheTime: 0,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  return (
    <PokemonCardContainer>
      {favorite?.data?.map(({ data, id }) => (
        <FavoriteCard key={id} id={id} value={data} />
      ))}
    </PokemonCardContainer>
  );
};

export default FavoritesPage;
