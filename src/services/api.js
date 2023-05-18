import axios from "axios";
import { fetcher } from "../libs/axios";

export const fetchAllPokemon = async () => {
  const response = await fetcher("pokemon?limit=150");
  return response;
};

export const fetchEachPokemon = async (url) => {
  const response = await axios(url);
  return response.data;
};

export const saveToDb = async (pokemon) => {
  axios({
    url: "http://localhost:3000/pokemon",
    method: "POST",
    data: pokemon,
  });
};

export const pokemonMapper = (pokemon) => ({
  name: pokemon.name,
  image: pokemon?.sprites?.front_default,
  weight: pokemon.weight,
  height: pokemon.height,
  abilities: pokemon?.abilities?.map((ability) => ability.ability.name),
  baseExperience: pokemon.base_experience,
});
