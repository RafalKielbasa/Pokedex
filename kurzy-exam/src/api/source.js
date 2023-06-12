import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPartialResults = async (offset) => {
  const response = await axios.get(`${BASE_URL}?limit=15&offset=${offset}`);
  const partialData = response?.data?.results;
  return partialData;
};

export const getFullResults = async () => {
  const fullResults = [];
  try {
    const response = await axios.get(`${BASE_URL}?limit=150&offset=0`);
    const fullData = response?.data?.results;
    fullData?.map(async (item) => {
      const responseurls = await axios.get(item.url);
      const urlsData = responseurls?.data;
      fullResults.push(urlsData);
      // console.log(`data2`, data2);
    });
  } catch (error) {
    console.log(error.responseurls);
  }
  return fullResults;
};

// export async function getUrlsData(array) {
//   array?.map(async (item) => {
//     console.log(`item`, item);
//   });

//   const arrayofRecords = [];
//   for (const element of array) {
//     try {
//       const response = await axios.get(element);
//       const data = response.data;
//       arrayofRecords.push(data);
//     } catch (error) {
//       console.log(error.response);
//     }
//   }
// if (setArray) {
//   setArray(arrayofRecords);
// }
//   return arrayofRecords;
// }

export const getFavorites = async () => {
  const response = await axios.get(`http://localhost:3001/favoriteData/`);
  return response;
};

export const getBattleResults = async () => {
  const response = await axios.get(`http://localhost:3001/battle/`);
  return response;
};
