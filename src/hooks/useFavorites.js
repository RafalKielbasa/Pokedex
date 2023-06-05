import { useQuery } from "@tanstack/react-query";
import { getAllFavoritesPokemon } from "../services/api";

export const useFavoritesQuery = (userId) => {
  return useQuery({
    queryKey: ["all-favorites"],
    queryFn: () => getAllFavoritesPokemon(userId),
    select: (data) => data?.data?.favorites,
  });
};
