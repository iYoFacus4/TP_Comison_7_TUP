import apiClient from "./apiConfig"; 


export const getAllAppointments = async () => {
  try {
    const response = await apiClient.get('/appointments');
    return response.data.data;
  } catch (error) {
    console.error('Error al cargar los turnos:', error);
    throw new Error("Error al cargar los turnos.");
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await apiClient.post('/appointments', appointmentData);
    return response.data.data;
  } catch (error) {
    console.error('Error al crear el turno:', error);
    throw new Error("Error al crear el turno.");
  }
};

export const deleteAppointment = async (id) => {
  try {
    await apiClient.delete(`/appointments/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar el turno:', error);
    throw new Error("Error al eliminar el turno.");
  }
};


export const updateAppointment = async (id, appointmentData) => {
  try {
    const response = await apiClient.put(`/appointments/${id}`, appointmentData);
    return response.data.data;
  } catch (error) {
    console.error('Error al actualizar el turno:', error);
    throw new Error("Error al actualizar el turno.");
  }
};





export const getAllClients = async () => {
  try {
    const response = await apiClient.get('/clients');
    return response.data.data;
  } catch (error) {
    console.error('Error al cargar los clientes:', error);
    throw new Error("Error al cargar los clientes.");
  }
};

export const getAllServices = async () => {
  try {
    const response = await apiClient.get('/services');
    return response.data.data;
  } catch (error) {
    console.error('Error al cargar los servicios:', error);
    throw new Error("Error al cargar los servicios.");
  }
};