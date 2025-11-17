import { api } from './api';

const endpoint = 'artistas';

export const getAllArtistas = () => api.get(endpoint);
export const getArtistaById = (id) => api.get(`${endpoint}/${id}`);
export const addArtista = (artista) => api.post(endpoint, artista);
export const updateArtista = (id, artista) => api.put(`${endpoint}/${id}`, artista);
export const deleteArtistaById = (id) => api.delete(`${endpoint}/${id}`);