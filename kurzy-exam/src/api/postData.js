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
