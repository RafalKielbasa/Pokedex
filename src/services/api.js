import { dbFetcher, fetcher } from '../libs/axios';
import { LocalStorage } from '../const/LocalStorage';
import axios from 'axios';

const pokemonMapper = (pokemon) => ({
  name: pokemon?.name,
  image: pokemon?.sprites?.front_default,
  weight: pokemon?.weight,
  height: pokemon?.height,
  abilities: pokemon?.abilities?.map((ability) => ability?.ability?.name),
  baseExperience: pokemon?.base_experience,
  id: pokemon?.id,
});

export const getSavedAsNewPokemon = () => {
  return dbFetcher({
    url: 'savedAsNew',
    method: 'GET',
  });
};

const getEditedPokemon = () => {
  return dbFetcher({
    url: 'edited',
    method: 'GET',
  });
};

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

  const correctData = allPokemon?.map((pokemon) => {
    return pokemonMapper(pokemon);
  });

  const savedAsNewPokemon = await getSavedAsNewPokemon();
  const editedPokemon = await getEditedPokemon();

  const updatedAllPokemon = correctData?.map((pokemon) => {
    const edited = editedPokemon?.data?.findIndex(
      (p) => p.name === pokemon?.name
    );

    return edited === -1 ? pokemon : editedPokemon?.data[edited];
  });

  return [...updatedAllPokemon, ...savedAsNewPokemon?.data];
};

export const getAllFavoritesPokemonData = async () => {
  const favoritesPokemon = await dbFetcher({
    url: `favorites`,
    method: 'GET',
  });

  return favoritesPokemon?.data;
};

export const addToFavorites = (pokemon) => {
  return dbFetcher({
    url: 'favorites',
    method: 'POST',
    data: pokemon,
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
    url: `users?id=${id}`,
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

export const addToEddited = (pokemon) => {
  return dbFetcher({
    url: 'edited',
    method: 'POST',
    data: pokemon,
  });
};

export const addAsNew = (pokemon) => {
  return dbFetcher({
    url: `savedAsNew`,
    method: 'POST',
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
