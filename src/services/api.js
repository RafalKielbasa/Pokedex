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

export const getAllFavoritesPokemon = (userId) => {
  return dbFetcher({
    url: `users/${userId}?_embed=favorites`,
    method: "GET",
  });
};

export const getAllFavoritesPokemonData = async (pokemonData) => {
  return await Promise.allSettled(
    pokemonData?.map(({ id }) => {
      return dbFetcher({
        url: `pokemon/${id}`,
        method: "GET",
      });
    })
  );
};

export const addToFavorites = ({ pokemonId, userId }) => {
  if (!userId) {
    throw new Error("You have to be logged to add Pokemon to favorites");
  } else {
    return dbFetcher({
      url: "favorites",
      method: "POST",
      data: { id: pokemonId, userId },
    });
  }
};

export const deleteFromFavorites = (pokemonId) => {
  return dbFetcher({
    url: `favorites/${pokemonId}`,
    method: "DELETE",
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
    url: `users?id=${id}&_embed=favorites`,
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
    throw new Error("User already exist");
  }
};

export const signIn = async (userData) => {
  const isExisting = await checkIfUserExist(userData.email);
  const user = await getUser(userData.email);

  console.log(isExisting);

  if (isExisting) {
    if (user?.data[0]?.password === userData?.password) {
      localStorage.setItem(LocalStorage.LsUserItem, user?.data[0]?.id);
    } else {
      throw new Error("Wrong Password");
    }
  } else {
    throw new Error("Account with this email does not exist");
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

export const checkIfUserIsLogged = () => {
  const user = localStorage.getItem("Pokedex-user");

  if (user === null) {
    return false;
  } else {
    return true;
  }
};
