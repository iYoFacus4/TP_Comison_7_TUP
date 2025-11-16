import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejo de peticiones HTTP
 * @param {Function} fetchFunction - Función que realiza la petición HTTP
 * @param {Array} dependencies - Dependencias para re-ejecutar la petición
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'Error al cargar los datos');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Hook para operaciones de mutación (POST, PUT, DELETE)
 * @returns {Object} - { mutate, loading, error }
 */
export const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (mutationFunction) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFunction();
      return result;
    } catch (err) {
      setError(err.message || 'Error en la operación');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

