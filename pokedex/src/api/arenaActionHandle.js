import axios from "axios";
export const arenaActionHandle = async (location, data, myId) => {
  const newData = {
    ...data,
    base_experience: Number(data?.base_experience) + 10,
  };
  try {
    let response = await axios.patch(`http://localhost:3000/${location}/${myId}`, newData);
    console.log("Patched");
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      const response = await axios.post(`http://localhost:3000/${location}/`, newData);
      console.log("POST");
      return response;
    }
  }
};
