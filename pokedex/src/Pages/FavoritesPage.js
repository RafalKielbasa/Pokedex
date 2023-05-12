import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFavorite } from "src/api";
import { FavoriteCard, PokemonCardContainer } from "./components";
const FavoritesPage = () => {
  const { data: favorite } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => fetchFavorite(),
    refetchOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  console.log({ favorite });
  return (
    <PokemonCardContainer>
      {favorite?.data?.map((value) => (
        <FavoriteCard key={value?.id} id={value?.id} value={value} />
      ))}
    </PokemonCardContainer>
  );
};

export default FavoritesPage;
