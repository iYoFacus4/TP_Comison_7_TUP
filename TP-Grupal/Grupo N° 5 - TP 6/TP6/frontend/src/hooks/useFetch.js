import { useState, useEffect, useCallback } from 'react';

export const useFetch = (serviceFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (isMounted) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceFunction();
      if (isMounted) {
        setData(result);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let isMounted = true;
    fetchData(isMounted);
    
    // Función de limpieza para evitar seteos de estado en componentes desmontados
    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  // Función para recargar los datos manualmente
  const refresh = () => {
    fetchData(true);
  };

  return { data, loading, error, refresh };
};