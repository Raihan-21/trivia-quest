import axios from "axios";
import React, { useState } from "react";

const useFetch = (url: string): [() => void, any, boolean] => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetch: () => void = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return [fetch, data, isLoading];
};

export default useFetch;
