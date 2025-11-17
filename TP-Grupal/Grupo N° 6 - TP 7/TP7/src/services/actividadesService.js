import { http } from './http';

// GET /api/actividades
export const getActividades = async () => {
  return http('/actividades');
};

export const getActividadById = async (id) => {
  return http(`/actividades/${id}`);
};

export const createActividad = async (actividad) => {
  return http('/actividades', {
    method: 'POST',
    body: JSON.stringify(actividad),
  });
};

export const updateActividad = async (id, actividad) => {
  return http(`/actividades/${id}`, {
    method: 'PUT',
    body: JSON.stringify(actividad),
  });
};

export const deleteActividad = async (id) => {
  return http(`/actividades/${id}`, { method: 'DELETE' });
};

export const getActividadesConCupos = async () => {
  return http('/actividades/con-cupos');
};
