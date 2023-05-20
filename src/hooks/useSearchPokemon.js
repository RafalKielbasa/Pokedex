import { useQuery } from "@tanstack/react-query";
import { getSearchPokemon } from "../services/api";

export const useSearchPokemonQuery = (key) => {
  console.log(key);
  return useQuery({
    queryKey: ["search-pokemon-test-ex", key],
    queryFn: () => getSearchPokemon(key),
    enabled: typeof key === "string",
  });
};
