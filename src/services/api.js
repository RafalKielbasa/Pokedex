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
  win: 0,
  loss: 0,
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

export const updateAfterFight = async (fighters, setResult) => {
  const editedPokemon = await getEditedPokemon();

  const pokemonWithHighestAttack = () => {
    let highestScore = null;
    let pokemonWithHighestScore = null;

    for (let i = 0; i < fighters.length; i++) {
      const pokemon = fighters[i];
      const { weight, baseExperience } = pokemon;
      const score = weight * baseExperience;

      if (score > highestScore) {
        highestScore = score;
        pokemonWithHighestScore = pokemon;
      }
    }

    return pokemonWithHighestScore;
  };

  const winner = pokemonWithHighestAttack(fighters);

  const isInEdited = editedPokemon?.data?.findIndex(
    (pokemon) => pokemon?.name === winner?.name
  );

  const stats = fighters?.map(
    (pokemon) => pokemon?.baseExperience * pokemon?.weight
  );

  if (stats?.length === 2 && stats[0] === stats[1]) {
    setResult('draw!');
  } else {
    if (isInEdited > -1) {
      setResult(winner?.name);
      return dbFetcher({
        url: `edited/${winner?.id}`,
        method: 'PUT',
        data: {
          ...winner,
          win: winner?.win + 1,
          baseExperience: winner?.baseExperience + 10,
        },
      });
    } else {
      setResult(winner?.name);
      return dbFetcher({
        url: 'edited',
        method: 'POST',
        data: {
          ...winner,
          win: winner?.win + 1,
          baseExperience: winner?.baseExperience + 10,
        },
      });
    }
  }
};
