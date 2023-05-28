import axios from "axios";

import { updateUrlFnc } from "src/helpers";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchDataToFilter = async (editedList) => {
  const {
    data: { results },
  } = await axios.get(`${BASE_URL}?offset=0&limit=151`);
  const filteredData = updateUrlFnc(results, editedList);
  return filteredData;
};
