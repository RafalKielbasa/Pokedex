import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorites } from "../services/api";
import { enqueueSnackbar } from "notistack";

export const useAddToFavMutation = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pokemonId) => {
      console.log(userId);
      addToFavorites({ pokemonId, userId });
    },
    onError: (err) => enqueueSnackbar(`${err}`, { variant: "error" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-favorites"] }),
  });
};
