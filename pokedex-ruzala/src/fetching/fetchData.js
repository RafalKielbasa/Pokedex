import axios from "axios";

export default async function fetchData(URL) {
  try {
    const response = await axios.get(URL);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.response);
  }
}
