import axios from "axios";
export const arenaActionHandle = async (location, data, myId) => {
  const newData = {
    ...data,
    base_experience: data?.data?.base_experience + 10,
  };
  try {
    const response = await axios.patch(
      `http://localhost:3000/${location}/${myId}`,
      {
        data: newData,
      }
    );
    console.log("Patched");
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      const newData = {
        ...data,
        base_experience: data?.data?.base_experience + 10,
      };
      const response = await axios.post(`http://localhost:3000/${location}/`, {
        data: newData,
        id: myId,
      });
      console.log("POST");
      return response;
    }
  }
};
