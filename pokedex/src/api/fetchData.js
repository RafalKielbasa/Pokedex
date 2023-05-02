import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchData = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response;
};
export const fetchPokemonData = async (url) => {
  const response = await axios.get(url);
  return response;
};
