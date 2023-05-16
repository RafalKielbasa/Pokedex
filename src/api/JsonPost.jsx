import axios from "axios";

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
