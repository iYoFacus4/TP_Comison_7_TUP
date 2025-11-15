
import API_URL from './apiConfig';
import  {CLIENTS_API} from '../endpoints/apiEndoints';

export const getClients = async () => {
  try {
    const response = await fetch(`${API_URL}${CLIENTS_API}`); 
    
    if (!response.ok) {
      throw new Error('Error al obtener los clientes desde la API');
    }
    return await response.json();

  } catch (error) {
    console.error('Error en getClients:', error);
    throw error; 
  }
};

export const addClient = async (newClient) => {
  try {
    const response = await fetch(`${API_URL}${CLIENTS_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    });

    if (!response.ok) {
      throw new Error('Error al crear el cliente');
    }
    return await response.json();

  } catch (error) {
    console.error('Error en addClient:', error);
    throw error;
  }
};


export const deleteClient = async (id) => {
  try {
    const response = await fetch(`${API_URL}${CLIENTS_API}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el cliente');
    }
    
    return true; 

  } catch (error) {
    console.error('Error en deleteClient:', error);
    throw error;
  }
};

export const updateClient = async (id, updatedClient) => {
  try {
    const response = await fetch(`${API_URL}${CLIENTS_API}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedClient), 
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el cliente');
    }
    return await response.json();

  } catch (error) {
    console.error('Error en updateClient:', error);
    throw error;
  }
};