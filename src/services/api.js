import { dbFetcher, fetcher } from '../libs/axios';
import { LocalStorage } from '../const/LocalStorage';
import axios from 'axios';

const pokemonMapper = (pokemon) => ({
  name: pokemon.name,
  image: pokemon?.sprites?.front_default,
  weight: pokemon.weight,
  height: pokemon.height,
  abilities: pokemon?.abilities?.map((ability) => ability.ability.name),
  baseExperience: pokemon.base_experience,
});

export const fetchAllPokemon = async (limit = 151) => {
  const pokemon = await fetcher({
    url: 'pokemon',
    method: 'GET',
    params: {
      limit,
    },
  });

  const pokemonData = pokemon?.data?.results || [];

  const pokemonPromises = pokemonData.map(async ({ name, url }) => {
    const response = await axios({
      url,
      method: 'GET',
    });
    return response.data;
  });

  const allPokemon = await Promise.all(pokemonPromises);

  return allPokemon?.map((pokemon) => {
    return pokemonMapper(pokemon);
  });
};

export const getCorrectPokemon = (name) => {
  return fetcher({
    url: `pokemon/${name}`,
    method: 'GET',
  });
};

export const getPaginatedPokemon = async (offset, limit) => {
  const pokemon = await fetcher({
    url: 'pokemon',
    method: 'GET',
    params: {
      offset,
      limit,
    },
  });

  const pokemonData = pokemon?.data?.results || [];

  const pokemonPromises = pokemonData.map(async ({ url }) => {
    const response = await axios({
      url,
      method: 'GET',
    });
    return response.data;
  });

  const allPokemon = await Promise.all(pokemonPromises);

  return allPokemon?.map((pokemon) => {
    return pokemonMapper(pokemon);
  });
};

export const getAllFavoritesPokemonData = async () => {
  const favoritesPokemon = await dbFetcher({
    url: `favorites`,
    method: 'GET',
  });

  const correctData = favoritesPokemon?.data || [];

  const favoritesPokemonData = correctData?.map(async ({ id }) => {
    return await fetcher({
      url: `pokemon/${id}`,
      method: 'GET',
    });
  });

  const allPokemon = await Promise.all(favoritesPokemonData);

  return allPokemon?.map((pokemon) => {
    return pokemonMapper(pokemon?.data);
  });
};

export const addToFavorites = (pokemonId) => {
  return dbFetcher({
    url: 'favorites',
    method: 'POST',
    data: { id: pokemonId },
  });
};

export const deleteFromFavorites = (pokemonId) => {
  return dbFetcher({
    url: `favorites/${pokemonId}`,
    method: 'DELETE',
  });
};

export const postUser = (user) => {
  return dbFetcher({
    url: 'users',
    method: 'POST',
    data: user,
  });
};

const getUser = (email) => {
  return dbFetcher({
    url: 'users',
    method: 'GET',
    params: {
      email,
    },
  });
};

export const getCurrentUser = (id) => {
  return dbFetcher({
    url: `users?id=${id}&_embed=favorites`,
    method: 'GET',
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
    throw new Error('User already exist');
  }
};

export const signIn = async (userData) => {
  const isExisting = await checkIfUserExist(userData.email);
  const user = await getUser(userData.email);

  if (isExisting) {
    if (user?.data[0]?.password === userData?.password) {
      localStorage.setItem(LocalStorage.LsUserItem, user?.data[0]?.id);
    } else {
      throw new Error('Wrong Password');
    }
  } else {
    throw new Error('Account with this email does not exist');
  }
};

export const editPost = (pokemon) => {
  return dbFetcher({
    url: 'pokemon',
    method: 'POST',
    data: pokemon,
  });
};

export const editPut = (pokemon, id) => {
  return dbFetcher({
    url: `pokemon/${id}`,
    method: 'PUT',
    data: pokemon,
  });
};

export const checkIfUserIsLogged = () => {
  const user = localStorage.getItem('Pokedex-user');

  if (user === null) {
    return false;
  } else {
    return true;
  }
};
