import axios from "axios";
export const postData = async (data, myName) => {
  const response = await axios.post(`http://localhost:3000/favorite/`, {
    data,
    name: myName,
  });
  return response;
};
