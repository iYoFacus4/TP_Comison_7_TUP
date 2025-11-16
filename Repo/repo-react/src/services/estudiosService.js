import api from '../services/api.js';
import { ESTUDIOS_URL } from '../endpoints/estudios.js';

// Servicio para obtener todos los estudios

//muestra todos los estudios
export const getEstudios = async () => {
    const response =  await api.get(ESTUDIOS_URL);
    return response.data;
}
// muestra un estudio por id
export const getEstudioById = async (id) => {
    const response =  await api.get(`${ESTUDIOS_URL}${id}`);
    return response.data;
}
// crea un nuevo estudio
export const createEstudio = async (estudioData) => {
    const response =  await api.post(ESTUDIOS_URL, estudioData);
    return response.data;
}
// actualiza un estudio existente
export const updateEstudio = async (id, estudioData) => {
    const response =  await api.put(`${ESTUDIOS_URL}${id}`, estudioData);
    return response.data;
}
// elimina un estudio por id
export const deleteEstudio = async (id) => {
    const response =  await api.delete(`${ESTUDIOS_URL}${id}`);
    return response.data;
}