import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const fetchData = async (page, editedList) => {
  const response = await axios.get(`${BASE_URL}?offset=${page}&limit=15`);
  const filteredData = response?.data?.results?.map(({ name, url }) => {
    let value = null;
    editedList && editedList?.includes(name)
      ? (value = {
          name,
          url: `http://localhost:3000/edited/${name}`,
        })
      : (value = { name, url });
    return value;
  });
  return filteredData;
};
export const allPokemonNamesList = async () => {
  const response = await axios.get(`${BASE_URL}?offset=0&limit=151`);
  const filteredData = response?.data?.results?.map(({ name }) => name);
  return filteredData;
};
export const fetchDataToFilter = async (editedList) => {
  const response = await axios.get(`${BASE_URL}?offset=0&limit=151`);
  const filteredData = response?.data?.results?.map(({ name, url }) => {
    let value = null;
    editedList && editedList?.includes(name)
      ? (value = {
          name,
          url: `http://localhost:3000/edited/${name}`,
        })
      : (value = { name, url });
    return value;
  });
  return filteredData;
};
export const fetchPokemonData = async (url) => {
  const filteredQueriesKeys = [
    "abilities",
    "base_experience",
    "height",
    "id",
    "name",
    "sprites",
    "weight",
  ];
  const response = await axios.get(url);
  const filteredData = Object.fromEntries(
    Object.entries(response?.data).filter(([key]) =>
      filteredQueriesKeys.includes(key)
    )
  );
  const updatedData = {
    ...filteredData,
    winCount: 0,
    lossCount: 0,
    tieCount: 0,
  };
  return updatedData;
};
export const fetchFavorite = async () => {
  const response = await axios.get(`http://localhost:3000/favorite/`);
  const filteredData = response?.data.map(({ name }) => name);
  return filteredData;
};
export const fetchOnePokemon = async (editedList, name) => {
  const filteredQueriesKeys = [
    "abilities",
    "base_experience",
    "height",
    "id",
    "name",
    "sprites",
    "weight",
  ];
  const PokemonUrl =
    editedList && editedList?.includes(name)
      ? `http://localhost:3000/edited/${name}`
      : `https://pokeapi.co/api/v2/pokemon/${name}`;
  const response = await axios.get(PokemonUrl);
  const filteredData = Object.fromEntries(
    Object.entries(response?.data).filter(([key]) =>
      filteredQueriesKeys.includes(key)
    )
  );
  return filteredData;
};
export const fetchEditedList = async () => {
  const response = await axios.get(`http://localhost:3000/edited/`);
  const EditedList = response?.data.map(({ name }) => name);
  return EditedList;
};
export const fetchUsers = async () => {
  const filterKeys = ["userName", "password"];
  const response = await axios.get(`http://localhost:3000/users/`);
  const filteredResponse = response?.data?.map((value) =>
    Object.fromEntries(
      Object.entries(value)?.filter(([key]) => filterKeys?.includes(key))
    )
  );
  return filteredResponse;
};
