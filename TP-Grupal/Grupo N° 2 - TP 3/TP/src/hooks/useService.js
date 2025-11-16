// src/hooks/useService.js
import { useState, useEffect } from "react";

/**
 * Hook personalizado para simular consumo de una API.
 * Recibe una función asíncrona (service) que devuelve datos.
 *
 * @param {Function} service - función async que obtiene los datos (por ejemplo fetchFakeProducts)
 * @param {Array} deps - dependencias del efecto (igual que useEffect)
 */
export function useService(service, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    service()
      .then((result) => {
        if (mounted) {
          setData(result);
        }
      })
      .catch((err) => {
        if (mounted) {
          console.error("Error en useService:", err);
          setError(err.message || "Error al obtener datos");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, deps);

  return { data, loading, error };
}