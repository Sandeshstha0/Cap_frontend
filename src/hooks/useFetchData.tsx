/* eslint-disable react-hooks/exhaustive-deps */


import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

const useFetchData = (url: string) => {
  const [fetchedData, setFetchedData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(url);
      setFetchedData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [url]);

  // You can expose this function to allow manual refetching
  const refetchData = () => {
    fetchData();
  };

  return { fetchedData, loading, error, refetchData };
};

export default useFetchData;
