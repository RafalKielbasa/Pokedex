import { useQuery } from '@tanstack/react-query';
import { getSavedAsNewPokemon } from '../services/api';

export const useSavedNewPokemonQuery = () => {
  return useQuery({
    queryKey: ['use-saved-pokemon'],
    queryFn: () => getSavedAsNewPokemon(),
  });
};
