import { useQuery } from '@tanstack/react-query';
import { getAllPokemon } from '../services/api';

export const useGetAllPokemonQuery = () => {
  return useQuery({
    queryKey: ['all-pokemon'],
    queryFn: () => getAllPokemon(),
  });
};
