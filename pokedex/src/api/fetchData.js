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
  const response = await axios.get(url);
  return response;
};
export const fetchFavorite = async () => {
  const response = await axios.get(`http://localhost:3000/favorite/`);
  return response;
};
export const fetchEdited = async () => {
  const response = await axios.get(`http://localhost:3000/edited/`);
  return response;
};
