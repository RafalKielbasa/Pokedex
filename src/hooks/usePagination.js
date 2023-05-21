import { useQuery } from "@tanstack/react-query";
import { getPaginatedPokemon } from "../services/api";

export const usePaginationQuery = (currentPage) => {
  return useQuery({
    queryKey: ["pagination", currentPage],
    queryFn: () => getPaginatedPokemon(currentPage),
  });
};
