const API_URL = 'http://localhost:3001';

// Obtener datos de reportes
export const getReportes = async () => {
  const response = await fetch(`${API_URL}/reportes`);
  if (!response.ok) {
    throw new Error('Error al obtener reportes');
  }
  return response.json();
};

// Obtener dataCards (métricas)
export const getDataCards = async () => {
  const response = await fetch(`${API_URL}/dataCards`);
  if (!response.ok) {
    throw new Error('Error al obtener métricas');
  }
  return response.json();
};

