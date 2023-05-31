import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFromFavorites } from "../services/api";

export const useDeleteFromFavMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pokemonId) => deleteFromFavorites(pokemonId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-favorites"] }),
  });
};
