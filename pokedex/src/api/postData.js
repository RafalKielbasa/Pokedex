import axios from "axios";
export const postData = async (location, data, myName) => {
  const newData = { ...data, base_experience: data.base_experience + 10 };
  const response = await axios.post(`http://localhost:3000/${location}/`, {
    data: newData,
    name: myName,
  });
  return response;
};
