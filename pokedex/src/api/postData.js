import axios from "axios";
export const postData = async (location, data) => {
  const response = await axios.post(`http://localhost:3000/${location}/`, data);
  return response;
};
