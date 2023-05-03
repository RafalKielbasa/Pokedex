import { instance } from '../libs/axios';

export const getAllPokemon = async () => {
  return instance.get('pokemon');
};
