import axios from "axios";

const ApiUrl = process.env.REACT_APP_API_URL;
const DbUrl = process.env.REACT_APP_DB_URL;

export const fetcher = axios.create({
  baseURL: ApiUrl,
});

export const dbFetcher = axios.create({
  baseURL: DbUrl,
});
