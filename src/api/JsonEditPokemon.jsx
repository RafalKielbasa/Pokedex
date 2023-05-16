import axios from "axios";

export const JsonEditPokemon = (pokemonData, newValues) => {
  axios
    .post(`http://localhost:3001/editedPokemon/`, {
      id: pokemonData?.id,
      sprite: pokemonData?.sprite,
      name: newValues.pokemonName,
      weight: newValues.weight,
      ability: newValues.ability,
      height: newValues.height,
      base_experience: newValues.baseExperience,
    })
    .catch((error) => {
      if (error.response.status === 500) {
        axios.put(`http://localhost:3001/editedPokemon/${pokemonData?.id}`, {
          id: pokemonData?.id,
          sprite: pokemonData?.sprite,
          name: newValues.pokemonName,
          weight: newValues.weight,
          ability: newValues.ability,
          height: newValues.height,
          base_experience: newValues.baseExperience,
        });
      }
    });
  return;
};
