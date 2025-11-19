// 1. ¡LA RUTA BASE DEBE INCLUIR /api!
const API_BASE_URL = 'http://localhost:3001/api'; // <--- CORREGIDO

const apiService = {
  // Función genérica para obtener todos los items (socios, deportes, etc.)
  getAll: async (endpoint) => {
    // endpoint será 'socios', 'deportes', etc.
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error al obtener datos de ${endpoint}`);
    }
    return response.json();
  },
  // Función para registrarse
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }
    
    return response.json(); // Devuelve { message, user: {...} }
  },
  // Función genérica para actualizar
  updateItem: async (endpoint, id, data) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
      method: 'PUT', // Usamos PUT para actualizar completo
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar item ${id} en ${endpoint}`);
    }
    return response.json();
  },

  // Función genérica para crear un nuevo item
  createItem: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Error al crear item en ${endpoint}`);
    }
    return response.json();
  },

  // Función genérica para eliminar
  deleteItem: async (endpoint, id) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Error al eliminar item en ${endpoint}`);
    }
    return response.json();
  },
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      // El backend devuelve 'El email ya está registrado'
      throw new Error(errorData.message || 'Error al registrar usuario'); 
    }
    
    return response.json();
  }
};

  // La función de login real la quitamos por ahora,
  // ya que la simulamos en el frontend (Paso 3)

export default apiService;