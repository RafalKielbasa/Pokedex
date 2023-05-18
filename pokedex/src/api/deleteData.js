import axios from "axios";
export const deleteData = async (myName) => {
  const response = await axios.delete(`http://localhost:3000/favorite/${myName}`);
  return response;
};
