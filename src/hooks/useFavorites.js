import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../services/api";

export const useFavoritesQuery = () => {
  return useQuery({
    queryKey: ["all-favorites"],
    queryFn: () => getFavorites(),
  });
};
