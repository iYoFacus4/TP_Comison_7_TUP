// TP7/src/hooks/useFetch.js
import { useState, useEffect, useCallback } from "react";

export function useFetch(asyncFunction, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      setError(err.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useMutation() {
  const [loading, setLoading] = useState(false);

  const mutate = async (mutationFn) => {
    setLoading(true);
    try {
      await mutationFn();
    } catch (err) {
      console.error("Error en mutación:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
}
