import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchData = async (page) => {
  const response = await axios.get(`${BASE_URL}?offset=${page}&limit=15`);
  return response;
};
export const fetchDataToFilter = async () => {
  const response = await axios.get(`${BASE_URL}?offset=0&limit=151`);
  return response;
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
  return response;
};
export const fetchEdited = async () => {
  const response = await axios.get(`http://localhost:3000/edited/`);
  return response?.data;
};
export const fetchEditedList = async () => {
  const response = await axios.get(`http://localhost:3000/edited/`);
  return response?.data;
};
export const fetchUsers = async () => {
  const filterKeys = ["userName", "password"];
  const response = await axios.get(`http://localhost:3000/users/`);
  const filteredResponse = response?.data?.map((value) =>
    Object.fromEntries(
      Object.entries(value).filter(([key]) => filterKeys.includes(key))
    )
  );
  return filteredResponse;
};
