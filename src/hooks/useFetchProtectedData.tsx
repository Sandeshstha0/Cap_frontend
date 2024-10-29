"use client";

import { useState, useEffect } from 'react';
import { axiosClient, setAxiosAuthHeader } from '../lib/httpClient';

interface FetchState<T> {
  data: T | null;
  error: string | null;
  refetchData: () => void;
}

const useFetchProtectedData = <T,>(endpoint: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setError('Access token is missing. Please log in again.');
      return;
    }

    try {
      setAxiosAuthHeader(accessToken);
      const response = await axiosClient.get<T>(endpoint);
      setData(response.data);
    } catch (error: any) {
      console.error('Failed to fetch protected data:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]); // Fetch data only when `endpoint` changes or on mount

  // Expose a function to allow manual refetching
  const refetchData = () => {
    fetchData();
  };

  return { data, error, refetchData };
};

export default useFetchProtectedData;
