const API_URL = 'http://localhost:3001';

// Obtener todos los miembros
export const getMiembros = async () => {
  const response = await fetch(`${API_URL}/miembros`);
  if (!response.ok) {
    throw new Error('Error al obtener miembros');
  }
  return response.json();
};

// Obtener un miembro por ID
export const getMiembroById = async (id) => {
  const response = await fetch(`${API_URL}/miembros/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener el miembro');
  }
  return response.json();
};

// Crear un nuevo miembro
export const createMiembro = async (miembro) => {
  const response = await fetch(`${API_URL}/miembros`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(miembro),
  });
  if (!response.ok) {
    throw new Error('Error al crear el miembro');
  }
  return response.json();
};

// Actualizar un miembro
export const updateMiembro = async (id, miembro) => {
  const response = await fetch(`${API_URL}/miembros/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(miembro),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el miembro');
  }
  return response.json();
};

// Eliminar un miembro
export const deleteMiembro = async (id) => {
  const response = await fetch(`${API_URL}/miembros/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el miembro');
  }
  return response.json();
};

