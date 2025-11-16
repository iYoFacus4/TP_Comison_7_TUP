import { http } from './http';
const base = '/prestamos';

export const PrestamosService = {
  list: () => http(base),
  create: (data) => http(base, { method: 'POST', body: JSON.stringify(data) })
};
