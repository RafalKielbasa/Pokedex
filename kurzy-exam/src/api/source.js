import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPartialResults = async (offset) => {
  const response = await axios.get(`${BASE_URL}?limit=15&offset=${offset}`);
  const partialData = response?.data?.results;
  return partialData;
};

export const getFullResults = async () => {
  // const fullResults = [];
  try {
    const response = await axios.get(`${BASE_URL}?limit=150&offset=0`);
    const fullData = response?.data?.results;
    return fullData;
    // response &&
    //   fullData?.map(async (item) => {
    //     const responseurls = await axios.get(item?.url);
    //     const urlsData = responseurls?.data;

    // console.log(`urlsData`, urlsData);
    // if (urlsData) {
    //   urlsData?.map((item) => {
    //     cost((state) => {
    //       state = [...state, item];
    //       console.log(`state`, state);
    //     });
    //   });
    // }

    // fullResults?.push(urlsData);
    // });
  } catch (error) {
    console.log(error.responseurls);
  }
};

export const getFavorites = async () => {
  const response = await axios.get(`http://localhost:3001/favoriteData/`);
  return response;
};

export const getBattleResults = async () => {
  const response = await axios.get(`http://localhost:3001/battle/`);
  return response;
};
