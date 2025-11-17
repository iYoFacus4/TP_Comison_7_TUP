
import { api } from './api';

const endpoint = 'eventos';

export const getAllEventos = () => api.get(endpoint);
export const getEventoById = (id) => api.get(`${endpoint}/${id}`);
export const addEvento = (evento) => api.post(endpoint, evento); 
export const updateEvento = (id, evento) => api.put(`${endpoint}/${id}`, evento);
export const deleteEventoById = (id) => api.delete(`${endpoint}/${id}`);

export const asociarArtistaAEvento = (idEvento, idArtista) => {
  return api.post(`${endpoint}/${idEvento}/artistas`, { idArtista });
};


export const inscribirAsistenteAEvento = (idEvento, idAsistente) => {
  return api.post(`${endpoint}/${idEvento}/asistentes`, { idAsistente });
};

export const removerArtistaDeEvento = (idEvento, idArtista) => {
  return api.delete(`${endpoint}/${idEvento}/artistas/${idArtista}`);
};

export const removerAsistenteDeEvento = (idEvento, idAsistente) => {
  return api.delete(`${endpoint}/${idEvento}/asistentes/${idAsistente}`);
};