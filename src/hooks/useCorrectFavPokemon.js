import { useQuery } from "@tanstack/react-query";
import { getCorrectFavorites } from "../services/api";

export const useCorrectFavPokemonQuery = (id) => {
  return useQuery({
    queryKey: ["get-correct-favorite-pokemon"],
    queryFn: () => getCorrectFavorites(id),
  });
};
