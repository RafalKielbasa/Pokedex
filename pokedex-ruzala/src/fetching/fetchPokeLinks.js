import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
export default async function fetchPokeLinks() {
  let rawData;
  const arrayOfLinks = [];
  try {
    const response = await axios.get(`${baseURL}pokemon/?limit=1300`);
    const data = response.data;
    rawData = data;
  } catch (error) {
    console.log(error.response);
  }
  rawData.results.forEach((element) => {
    arrayOfLinks.push(element.url);
  });
  return arrayOfLinks;
}
