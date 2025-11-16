import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useService: ejecuta una función async (request) y expone loading/error/data.
 * - deps: dependencias para re-ejecutar automáticamente.
 * - manual: si true, no ejecuta hasta llamar refetch().
 */
export function useService({ request, deps = [], manual = false }) {
  const [loading, setLoading] = useState(!manual);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const mounted = useRef(true);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await request();
      if (mounted.current) setData(res);
    } catch (err) {
      if (mounted.current) setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    if (!manual) run();
    return () => { mounted.current = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { loading, error, data, refetch: run, setData };
}


/** PATRON CLASICO LOADING/ERROR/DATA Y REFETCH */