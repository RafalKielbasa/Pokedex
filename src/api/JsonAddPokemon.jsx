import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const JsonAddPokemon = (pokemonData, newValues) => {
  const uuid = uuidv4();
  const numericId = uuid.replace(/\D/g, "");

  console.log(numericId);
  axios
    .post(`http://localhost:3001/newPokemon/`, {
      id: numericId,
      sprite: pokemonData?.sprite,
      name: newValues.pokemonName,
      weight: newValues.weight,
      ability: newValues.ability,
      height: newValues.height,
      base_experience: newValues.baseExperience,
    })
    .catch((error) => {
      console.log(error.response.status);
    });
  return;
};
