import axios from "axios";
export const postData = async (data) => {
  const response = await axios.post(`http://localhost:3000/pokemon/`, { data });
  return response;
};
