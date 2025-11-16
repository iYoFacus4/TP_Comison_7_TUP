import { http } from './http';
const base = '/libros';

export const LibrosService = {
  list: () => http(base),
  get: (id) => http(`${base}/${id}`),
  create: (data) => http(base, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => http(`${base}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => http(`${base}/${id}`, { method: 'DELETE' })
};
