import axios from "axios";
import { dbFetcher, fetcher } from "../libs/axios";

export const fetchAllPokemon = async () => {
  const response = await fetcher("pokemon?limit=10&offset=150");
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

export const getAllPokemons = () => {
  return dbFetcher({
    url: "pokemon",
    method: "GET",
  });
};

export const getCorrectPokemon = (name) => {
  return dbFetcher({
    url: "pokemon",
    method: "GET",
    params: {
      name,
    },
  });
};

export const getSearchPokemon = (key, limit = 5) => {
  return dbFetcher({
    url: `pokemon?_sort=name`,
    method: "GET",
    params: {
      q: key,
      _limit: limit,
    },
  });
};

export const getPaginatedPokemon = (url, currentPage, limit = 15) => {
  return dbFetcher({
    url: url,
    method: "GET",
    params: {
      _page: currentPage,
      _limit: limit,
    },
  });
};

export const addToFavorites = (pokemon) => {
  return dbFetcher({
    url: "favorites",
    method: "POST",
    data: pokemon,
  });
};

export const deleteFromFavorites = (pokemon, id) => {
  return dbFetcher({
    url: `favorites/${id}`,
    method: "DELETE",
    data: pokemon,
  });
};

export const getCorrectFavorites = (name) => {
  return dbFetcher({
    url: `favorites`,
    method: "GET",
    params: {
      name,
    },
  });
};

export const getFavorites = (limit = 15, currentPage) => {
  return dbFetcher({
    url: "favorites",
    method: "GET",
    params: {
      _page: currentPage,
      _limit: limit,
    },
  });
};
