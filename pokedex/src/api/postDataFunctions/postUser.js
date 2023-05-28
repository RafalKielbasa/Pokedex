import axios from "axios";

import { enqueueSnackbar } from "notistack";

export const postUser = async (location, data) => {
  try {
    const response = await axios.post(`http://localhost:3000/${location}/`, data);
    return response;
  } catch (error) {
    enqueueSnackbar(error, { variant: "error" });
  }
};
