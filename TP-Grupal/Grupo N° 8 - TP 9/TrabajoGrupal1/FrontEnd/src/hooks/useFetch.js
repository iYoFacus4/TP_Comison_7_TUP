import { useState, useEffect } from 'react';

// URL base de la API simulada
const API_BASE_URL = 'http://localhost:5000';

/**
 * Custom Hook para manejar peticiones de datos (GET).
 *
 * @param {string} endpoint - El endpoint de la API (ej: '/members', '/sports').
 * @returns {object} { data, isLoading, error, refreshData }
 */
const useFetch = (endpoint) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0); // Para forzar la recarga

  const refreshData = () => setRefreshIndex(prev => prev + 1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Error al cargar los datos: ' + err.message);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, refreshIndex]); // Se ejecuta al cambiar la URL o al forzar la recarga

  return { data, isLoading, error, refreshData };
};

export default useFetch;