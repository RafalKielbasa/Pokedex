import axios from "axios";
import { fetcher } from "../libs/axios";

export const getAllPokemon = async () => {
  return fetcher.get("pokemon?limit=151").then((res) => {
    res?.data?.results?.map((item) => {
      return fetcher.get(item.url).then((result) => {
        const pokemon = {};
        pokemon["id"] = result?.data?.id;
        pokemon["name"] = result?.data?.name;
        pokemon["baseExperiance"] = result?.data?.base_experience;
        pokemon["weight"] = result?.data?.weight;
        pokemon["height"] = result?.data?.height;
        pokemon["image"] = result?.data?.sprites["front_default"];
        pokemon["ability"] = result?.data?.abilities[0].ability["name"];

        axios.post("/pokemons", { pokemon });
      });
    });
  });
};

export const getPokemonData = async (pokemonName) => {
  return fetcher.get(`pokemon/${pokemonName}`);
};
