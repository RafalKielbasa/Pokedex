import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const fetchPokemonNamesList = async () => {
  const {
    data: { results },
  } = await axios.get(`${BASE_URL}?offset=0&limit=151`);
  const filteredData = results?.map(({ name }) => name);
  return filteredData;
};
