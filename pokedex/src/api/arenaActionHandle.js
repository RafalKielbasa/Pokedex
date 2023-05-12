import axios from "axios";
export const arenaActionHandle = async (location, data, myName) => {
  const newData = { ...data, base_experience: data.base_experience + 10 };
  const response = await axios.patch(`http://localhost:3000/${location}/1/`, {
    data: newData,
  });
  //   const response = await axios.post(`http://localhost:3000/${location}/`, {
  //     data: newData,
  //     name: myName,
  //   });
  return response;
};
