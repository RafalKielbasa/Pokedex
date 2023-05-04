import { instance } from '../libs/axios';

export const getAllPokemon = async () => {
  return instance.get('pokemon?limit=100000000');
};

export const getPokemonData = async (pokemonName) => {
  return instance.get(`pokemon/${pokemonName}`);
};
