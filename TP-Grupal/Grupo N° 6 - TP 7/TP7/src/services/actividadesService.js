const API_URL = 'http://localhost:3001';

// Obtener todas las actividades
export const getActividades = async () => {
  const response = await fetch(`${API_URL}/actividades`);
  if (!response.ok) {
    throw new Error('Error al obtener actividades');
  }
  return response.json();
};

// Obtener una actividad por ID
export const getActividadById = async (id) => {
  const response = await fetch(`${API_URL}/actividades/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener la actividad');
  }
  return response.json();
};

// Crear una nueva actividad
export const createActividad = async (actividad) => {
  const response = await fetch(`${API_URL}/actividades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(actividad),
  });
  if (!response.ok) {
    throw new Error('Error al crear la actividad');
  }
  return response.json();
};

// Actualizar una actividad
export const updateActividad = async (id, actividad) => {
  const response = await fetch(`${API_URL}/actividades/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(actividad),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la actividad');
  }
  return response.json();
};

// Eliminar una actividad
export const deleteActividad = async (id) => {
  const response = await fetch(`${API_URL}/actividades/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar la actividad');
  }
  return response.json();
};

