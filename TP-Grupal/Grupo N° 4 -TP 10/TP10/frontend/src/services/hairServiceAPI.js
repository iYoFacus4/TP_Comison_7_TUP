
import API_URL from './apiConfig';
import  {SERVICES_API} from '../endpoints/apiEndoints';


export const getServices = async () => {
  try {
    const response = await fetch(`${API_URL}${SERVICES_API}`);
    if (!response.ok) throw new Error('Error al obtener los servicios');
    return await response.json();
  } catch (error) {
    console.error('Error en getServices:', error);
    throw error;
  }
};

export const addService = async (newService) => {
  try {
    const response = await fetch(`${API_URL}${SERVICES_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    });
    if (!response.ok) throw new Error('Error al crear el servicio');
    return await response.json();
  } catch (error) {
    console.error('Error en addService:', error);
    throw error;
  }
};


export const updateService = async (id, updatedService) => {
  try {
    const response = await fetch(`${API_URL}${SERVICES_API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedService),
    });
    if (!response.ok) throw new Error('Error al actualizar el servicio');
    return await response.json();
  } catch (error) {
    console.error('Error en updateService:', error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await fetch(`${API_URL}${SERVICES_API}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar el servicio');
    return true;
  } catch (error) {
    console.error('Error en deleteService:', error);
    throw error;
  }
};