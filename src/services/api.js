import axios from "axios";
import { dbFetcher, fetcher } from "../libs/axios";
import { LocalStorage } from "../const/LocalStorage";

export const fetchAllPokemon = async () => {
  const response = await fetcher("pokemon?limit=10&offset=150");
  return response;
};

export const fetchEachPokemon = async (url) => {
  const response = await axios(url);
  return response.data;
};

export const saveToDb = async (pokemon) => {
  dbFetcher({
    url: "pokemon",
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

export const addToFavorites = (id) => {
  return dbFetcher({
    url: "favorites",
    method: "POST",
    data: id,
  });
};

export const deleteFromFavorites = (pokemon, id) => {
  return dbFetcher({
    url: `favorites/${id}`,
    method: "DELETE",
    data: id,
  });
};

export const getCorrectFavorites = (id) => {
  return dbFetcher({
    url: `users?id=${id}`,
    method: "GET",
    params: {
      _expand: "favorites",
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

export const postUser = (user) => {
  return dbFetcher({
    url: "users",
    method: "POST",
    data: user,
  });
};

const getUser = (email) => {
  return dbFetcher({
    url: "users",
    method: "GET",
    params: {
      email,
    },
  });
};

export const getCurrentUser = (id) => {
  return dbFetcher({
    url: `users?id=${id}`,
    method: "GET",
  });
};

const checkIfUserExist = async (email) => {
  const data = await getUser(email);

  if (data?.data?.length === 0) {
    return false;
  } else {
    return true;
  }
};

export const signUp = async (userData) => {
  const isExisting = await checkIfUserExist(userData.email);

  if (!isExisting) {
    await postUser(userData);
  } else {
    throw new Error("User already");
  }
};

export const signIn = async (userData) => {
  const isExisting = await checkIfUserExist(userData.email);

  if (isExisting) {
    const user = await getUser(userData.email);

    if (user?.data[0]?.password === userData?.password) {
      localStorage.setItem(LocalStorage.LsUserItem, user?.data[0]?.id);
      console.log("zalogowany");
    } else {
      console.log("zle haslo");
    }
  } else {
    console.log("nie istenieje");
  }
};

export const signOut = () => {
  const loggedUser = localStorage.getItem(LocalStorage.LsUserItem);

  if (loggedUser) {
    localStorage.removeItem(LocalStorage.LsUserItem);
  }
};

export const editPost = (pokemon) => {
  return dbFetcher({
    url: "pokemon",
    method: "POST",
    data: pokemon,
  });
};

export const editPut = (pokemon, id) => {
  return dbFetcher({
    url: `pokemon/${id}`,
    method: "PUT",
    data: pokemon,
  });
};
