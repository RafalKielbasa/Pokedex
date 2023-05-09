import axios from "axios";
export const deleteData = async (myId) => {
  const response = await axios.delete(`http://localhost:3000/favorite/${myId}`);
  return response;
};
