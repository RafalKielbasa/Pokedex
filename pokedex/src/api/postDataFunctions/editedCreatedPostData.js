import axios from "axios";

import { enqueueSnackbar } from "notistack";

export const editedCreatedPostData = async (
  data,
  myName,
  editedList,
  action
) => {
  if (action === "edit") {
    if (editedList.includes(myName)) {
      try {
        const response = await axios.patch(
          `http://localhost:3000/edited/${myName}`,
          data
        );
        return response;
      } catch (error) {
        enqueueSnackbar(error, { variant: "error" });
      }
    } else {
      try {
        const response = await axios.post(
          `http://localhost:3000/edited/`,
          data
        );
        return response;
      } catch (error) {
        enqueueSnackbar(error, { variant: "error" });
      }
    }
  }
  if (action === "create") {
    const updatedData = {
      ...data,
      id: data?.id + 150,
      winCount: 0,
      lossCount: 0,
      tieCount: 0,
    };
    try {
      const response = await axios.post(
        `http://localhost:3000/edited/`,
        updatedData
      );
      return response;
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }
};
