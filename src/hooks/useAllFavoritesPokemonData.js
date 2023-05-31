import { useQuery } from "@tanstack/react-query";
import { getAllFavoritesPokemonData } from "../services/api";

export const useAllFavoritesPokemonDataQuery = (pokemonData) => {
  return useQuery({
    queryKey: ["use-all-favorites-pokemon-data", pokemonData],
    queryFn: () => getAllFavoritesPokemonData(pokemonData),
  });
};
