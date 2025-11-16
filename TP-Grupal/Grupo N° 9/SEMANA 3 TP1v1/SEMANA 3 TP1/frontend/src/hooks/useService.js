import { useEffect, useState, useCallback } from 'react';

export function useService(listFn, deps = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const res = await listFn();
      setData(res);
      setError('');
    } catch (e) {
      setError(e.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, [listFn]);

  useEffect(() => { reload(); }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, reload, setData };
}
