import { useQuery } from "@tanstack/react-query";
import { getAllPokemons } from "../services/api";

export const useAllPokemonQuery = () => {
  return useQuery({
    queryKey: ["useAllPokemon"],
    queryFn: () => getAllPokemons(),
  });
};
