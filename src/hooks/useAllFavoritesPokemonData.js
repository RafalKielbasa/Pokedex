import { useQuery } from '@tanstack/react-query';
import { getAllFavoritesPokemonData } from '../services/api';

export const useAllFavoritesPokemonDataQuery = () => {
  return useQuery({
    queryKey: ['use-all-favorites-pokemon-data'],
    queryFn: () => getAllFavoritesPokemonData(),
  });
};
