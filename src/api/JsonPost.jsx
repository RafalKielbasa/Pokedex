import axios from "axios";
// moze dawac blad 500 przy ponownym dodawaniu pokemona do areny, bo juz tam moze byc
export const JsonPost = (pokemonData, location) => {
  axios.post(`http://localhost:3001/${location}`, {
    id: pokemonData?.id,
    sprite: pokemonData?.sprite,
    name: pokemonData?.name,
    weight: pokemonData?.weight,
    ability: pokemonData?.ability,
    height: pokemonData?.height,
    base_experience: pokemonData?.base_experience,
  });
  return;
};
