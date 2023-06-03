import { useState, useEffect } from "react";

import axios from "axios";

export const useFetchLocalApi = (path) => {
  const [items, setItems] = useState(null) || [];
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/${path}`)
      .then((response) => {
        setItems(response?.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [path]);

  return {
    items,
    error,
  };
};
