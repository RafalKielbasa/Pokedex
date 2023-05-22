import { useQuery } from "@tanstack/react-query";
import { getCorrectFavorites } from "../services/api";

export const useCorrectFavPokemonQuery = (name) => {
  return useQuery({
    queryKey: ["get-correct-favorite-pokemon", name],
    queryFn: () => getCorrectFavorites(name),
  });
};
