import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPartialResults = async (offset) => {
  const response = await axios.get(`${BASE_URL}?limit=15&offset=${offset}`);
  const partialData = response?.data?.results;
  return partialData;
};

export const getFullResults = async () => {
  const response = await axios.get(`${BASE_URL}?limit=150&offset=0`);
  const fullData = response?.data?.results;
  return fullData;
};

export const getFavorites = async () => {
  const response = await axios.get(`http://localhost:3000/favoriteData/`);
  return response;
};

export const getBattleResults = async () => {
  const response = await axios.get(`http://localhost:3000/battle/`);
  return response;
};
