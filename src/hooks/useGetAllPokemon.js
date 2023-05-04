import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPokemon, getPokemonData } from '../services/api';

export const useGetAllPokemonQuery = () => {
  return useQuery({
    queryKey: ['all-pokemon'],
    queryFn: () => getAllPokemon(),
  });
};
