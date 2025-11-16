const API_BASE_URL = 'http://localhost:3006/api';

// Función genérica para manejar las peticiones
const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Error ${response.status}: ${errorData.message || 'Error en la petición'}`);
  }
  
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

export const api = {
  get: (endpoint) => fetchAPI(endpoint),
  
  post: (endpoint, data) => fetchAPI(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => fetchAPI(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  
  patch: (endpoint, data) => fetchAPI(endpoint, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => fetchAPI(endpoint, {
    method: 'DELETE',
  }),
};