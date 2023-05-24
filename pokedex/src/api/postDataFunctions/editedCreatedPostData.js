import axios from "axios";
import { enqueueSnackbar } from "notistack";
export const editedCreatedPostData = async (data, myName, editedList, action) => {
  if (action === "edit") {
    if (editedList.includes(myName)) {
      try {
        const response = await axios.patch(`http://localhost:3000/edited/${myName}`, data);
        console.log("Patched Edited");
        return response;
      } catch (error) {
        enqueueSnackbar(error);
      }
    } else {
      try {
        const response = await axios.post(`http://localhost:3000/edited/`, data);
        console.log("POST Edited");
        return response;
      } catch (error) {
        enqueueSnackbar(error);
      }
    }
  }
  if (action === "create") {
    const updatedData = { ...data, localCreated: true };
    try {
      const response = await axios.post(`http://localhost:3000/edited/`, updatedData);
      console.log("POST Created");
      return response;
    } catch (error) {
      enqueueSnackbar(error);
    }
  }
};
