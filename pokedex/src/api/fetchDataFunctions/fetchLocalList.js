import axios from "axios";
export const fetchLocalList = async (location) => {
  const { data } = await axios.get(`http://localhost:3000/${location}/`);
  const EditedList = data?.map(({ name }) => name);
  return EditedList;
};
