
import apiClient from './apiConfig';
import  {SERVICES_API} from '../endpoints/apiEndoints';


export const getServices = async () => {
  try {
    const response = await apiClient.get(SERVICES_API);
    return response.data.data;
  } catch (error) {
    console.error('Error en getServices:', error);
    throw error;
  }
};

export const addService = async (newService) => {
  try {
    const response = await apiClient.post(SERVICES_API, newService);
    return response.data.data;
  } catch (error) {
    console.error('Error en addService:', error);
    throw error;
  }
};


export const updateService = async (id, updatedService) => {
  try {
    const response = await apiClient.put(`${SERVICES_API}/${id}`, updatedService);
    return response.data.data;
  } catch (error) {
    console.error('Error en updateService:', error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    await apiClient.delete(`${SERVICES_API}/${id}`);
    return true;
  } catch (error) {
    console.error('Error en deleteService:', error);
    throw error;
  }
};