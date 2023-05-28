import axios from "axios";

import { updateUrlFnc } from "src/helpers";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchDataFromPage = async (page, editedList) => {
  const {
    data: { results },
  } = await axios.get(`${BASE_URL}?offset=${page}&limit=15`);
  const filteredData = await updateUrlFnc(results, editedList);
  return filteredData;
};
