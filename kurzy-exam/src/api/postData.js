import axios from "axios";
import { v4 } from "uuid";
import { blankpicture } from "src/Images";

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

export const postUsersData = (catalog, values) => {
  try {
    axios.post(`http://localhost:3001/${catalog}`, {
      name: values.name,
      email: values.email,
      pass: values.pass,
    });
  } catch (error) {
    console.error(error);
  }
};

export const postNewData = (
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
      id: v4(),
      pic: blankpicture,
      picDet: "",
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
