import axios from "axios";
export const editedCreatedPostData = async (data, myId) => {
  try {
    let response = await axios.patch(`http://localhost:3000/edited/${myId}`, data);
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
