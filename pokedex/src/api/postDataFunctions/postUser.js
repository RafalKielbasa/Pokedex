import axios from "axios";

export const postUser = async (location, data) => {
  const response = await axios.post(`http://localhost:3000/${location}/`, data);
  return response;
};
