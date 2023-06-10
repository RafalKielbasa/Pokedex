import { useQuery } from '@tanstack/react-query';
import { getPaginatedPokemon } from '../services/api';

export const usePaginationQuery = (offset, limit) => {
  return useQuery({
    queryKey: ['pagination', offset, limit],
    queryFn: () => getPaginatedPokemon(offset, limit),
  });
};
