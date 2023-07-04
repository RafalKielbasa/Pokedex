import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToFavorites } from '../services/api';
import { enqueueSnackbar } from 'notistack';

export const useAddToFavMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pokemon) => {
      addToFavorites(pokemon);
    },
    onSucces: queryClient.invalidateQueries({
      queryKey: ['use-all-favorites-pokemon-data'],
    }),
    onError: (err) => enqueueSnackbar(`${err}`, { variant: 'error' }),
  });
};
