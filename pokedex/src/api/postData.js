import axios from "axios";
export const postData = async (location, data, myId) => {
  const response = await axios.post(`http://localhost:3000/${location}/`, {
    data,
    id: myId,
  });
  return response;
};
