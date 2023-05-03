import axios from 'axios';

const ApiUrl = process.env.REACT_APP_API_URL;

export const instance = axios.create({
  baseURL: ApiUrl,
});
