import { http } from './http';
const base = '/alumnos';

export const AlumnosService = {
  list: () => http(base),
  create: (data) => http(base, { method: 'POST', body: JSON.stringify(data) })
};
