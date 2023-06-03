import axios from "axios";

import { filterOnlyNeedData } from "src/helpers";

export const fetchPokemonQueriesData = async (url, editedList, name) => {
  const { data } = await axios.get(url);
  const filteredData = filterOnlyNeedData(data);
  let updatedData = null;
  if (!editedList?.includes(name)) {
    updatedData = {
      ...filteredData,
      winCount: 0,
      lossCount: 0,
      tieCount: 0,
    };
  } else {
    updatedData = filteredData;
  }
  return updatedData;
};
