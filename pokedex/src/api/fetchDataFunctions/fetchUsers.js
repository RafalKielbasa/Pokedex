import axios from "axios";

export const fetchUsers = async () => {
  const filterKeys = ["name", "password"];
  const response = await axios.get(`http://localhost:3000/users/`);
  const filteredResponse = response?.data?.map((value) =>
    Object.fromEntries(Object.entries(value)?.filter(([key]) => filterKeys?.includes(key)))
  );
  return filteredResponse;
};
