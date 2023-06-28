import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPartialResults = async (offset) => {
  const response = await axios.get(`${BASE_URL}?limit=15&offset=${offset}`);
  const partialData = response?.data?.results;
  return partialData;
};

export const getFullResults = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=150&offset=0`);
    const fullData = response?.data?.results;
    return fullData;
  } catch (error) {
    console.log(error.responseurls);
  }
};

export const getFavorites = async () => {
  const response = await axios.get(`http://localhost:3001/favoriteData/`);
  return response;
};

// export const getBattleResults = async () => {
//   const response = await axios.get(`http://localhost:3001/battle/`);
//   return response;
// };

export const getBattleResults = (path) => {
  const [items, setItems] = useState(null) || [];

  useEffect(() => {
    axios.get(`http://localhost:3001/${path}`).then((response) => {
      setItems(response?.data);
    });
  }, [path]);

  console.log(`items`, items);

  return {
    items,
  };
};
