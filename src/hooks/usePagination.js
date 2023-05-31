import { useQuery } from "@tanstack/react-query";
import { getPaginatedPokemon } from "../services/api";

export const usePaginationQuery = (url, currentPage) => {
  return useQuery({
    queryKey: ["pagination", currentPage, url],
    queryFn: () => getPaginatedPokemon(url, currentPage),
  });
};
