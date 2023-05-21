import axios from "axios";
import { filterOnlyNeedData } from "src/helpers";
export const fetchPokemonQueriesData = async (url) => {
  const { data } = await axios.get(url);
  const filteredData = filterOnlyNeedData(data);
  const updatedData = {
    ...filteredData,
    winCount: 0,
    lossCount: 0,
    tieCount: 0,
  };
  return updatedData;
};
