import { useQuery } from '@tanstack/react-query';
import { getCorrectPokemon } from '../services/api';

// export const useCorrectPokemonQuery = (name) => {
//   return useQuery({
//     queryKey: ["correctPokemonData", name],
//     queryFn: () => getCorrectPokemon(name),
//     enabled: !!name,
//   });
// };
