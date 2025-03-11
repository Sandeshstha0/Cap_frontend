import { useState, useEffect } from 'react';
import axios from 'axios';
import { BudgetExpert } from '@/utils/LandingpageInterface/landingpage';

export const useFetchData = (url: string) => {
  const [data, setData] = useState<BudgetExpert | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<BudgetExpert>(url);
        setData(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};
