import { useQuery } from '@tanstack/react-query';
import { fetchAllPokemon } from '../services/api';

export const useAllPokemonQuery = () => {
  return useQuery({
    queryKey: ['useAllPokemon'],
    queryFn: () => fetchAllPokemon(),
  });
};
