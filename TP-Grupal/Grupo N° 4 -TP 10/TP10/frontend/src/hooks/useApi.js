
import { useState, useEffect, useCallback } from 'react';

export const useApi = (serviceFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await serviceFunction();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [serviceFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  return { data, loading, error, refetch: fetchData, setData };
};