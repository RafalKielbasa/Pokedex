import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const fetchPokemonNamesList = async (editedList) => {
  const {
    data: { results },
  } = await axios.get(`${BASE_URL}?offset=0&limit=151`);
  const filteredData = results?.map(({ name }) => name);
  const mergedData = filteredData?.concat(editedList);
  const uniqueData = [...new Set(mergedData)];
  return uniqueData;
};
