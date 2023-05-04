import axios from "axios";

export default async function fetchPokeLinks(URL) {
  let rawData;
  const arrayOfLinks = [];
  try {
    const response = await axios.get(URL);
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
