import axios from "axios";
export const postData = async (data, myId) => {
  const response = await axios.post(`http://localhost:3000/favorite/`, { data, id: myId });
  return response;
};
