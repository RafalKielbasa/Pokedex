import axios from "axios";

import { enqueueSnackbar } from "notistack";

export const postData = async (location, data) => {
  try {
    const response = await axios.post(`http://localhost:3000/${location}/`, {
      name: data,
    });
    return response;
  } catch (error) {
    enqueueSnackbar(error, { variant: "error" });
  }
};
