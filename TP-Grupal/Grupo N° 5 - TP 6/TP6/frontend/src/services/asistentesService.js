import { api } from './api';

const endpoint = 'asistentes';

export const getAllAsistentes = () => api.get(endpoint);
export const getAsistenteById = (id) => api.get(`${endpoint}/${id}`);
export const addAsistente = (asistente) => api.post(endpoint, asistente);
export const updateAsistente = (id, asistente) => api.put(`${endpoint}/${id}`, asistente);
export const deleteAsistenteById = (id) => api.delete(`${endpoint}/${id}`);