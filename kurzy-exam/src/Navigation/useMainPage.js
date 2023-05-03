import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useMainPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getURL() {
      try {
        const response = await axios.get(BASE_URL);
        setData(response?.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    getURL();
  }, []);

  return { data, loading };
};

export default useMainPage;
