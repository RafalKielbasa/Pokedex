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
export const editedCreatedPostData = async (data, myId) => {
  try {
    let response = await axios.patch(
      `http://localhost:3000/edited/${myId}`,
      data
    );
    console.log("Patched Edited");
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      const response = await axios.post(`http://localhost:3000/edited/`, data);
      console.log("POST Edited");
      return response;
    }
  }
};
