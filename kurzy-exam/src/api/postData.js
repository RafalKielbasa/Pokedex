import axios from "axios";

export const postData = (
  catalog,
  id,
  pic,
  picDet,
  name,
  height,
  baseexp,
  weight,
  abilitie
) => {
  try {
    axios.post(`http://localhost:3001/${catalog}`, {
      id,
      pic,
      picDet,
      name,
      height,
      baseexp,
      weight,
      abilitie,
    });
  } catch (error) {
    console.error(error);
  }
};

export const postUsersData = (catalog, name, email, pass) => {
  try {
    axios.post(`http://localhost:3001/${catalog}`, {
      name,
      email,
      pass,
    });
  } catch (error) {
    console.error(error);
  }
};
