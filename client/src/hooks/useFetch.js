import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for data fetching with loading and error states
 * @param {Function} fetchFn - The API function to call
 * @param {any} initialData - Initial state for the data
 * @returns {object} { data, loading, error, refetch }
 */
export const useFetch = (fetchFn, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetchFn();
      setData(response);
    } catch (err) {
      console.warn('useFetch: Failed to fetch data:', err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
