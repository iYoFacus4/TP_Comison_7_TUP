import { http } from './http';

// GET /api/socios
export const getMiembros = async () => {
  return http('/socios');
};

// PUT /api/socios/:id
export const updateMiembro = async (id, miembro) => {
  return http(`/socios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(miembro),
  });
};

// Si necesitás crear/eliminar:
export const createMiembro = async (miembro) => {
  return http('/socios', {
    method: 'POST',
    body: JSON.stringify(miembro),
  });
};

export const deleteMiembro = async (id) => {
  return http(`/socios/${id}`, { method: 'DELETE' });
};
