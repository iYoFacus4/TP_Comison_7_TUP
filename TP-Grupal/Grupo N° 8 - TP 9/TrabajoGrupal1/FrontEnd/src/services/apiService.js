// 1. Cambiamos la URL base al nuevo backend
const API_BASE_URL = 'http://localhost:3001/api'; // Usamos /api como prefijo

const apiService = {
  // ... (tus funciones getAll, updateItem, createItem se quedan igual) ...
  getAll: async (endpoint) => { ... },
  updateItem: async (endpoint, id, data) => { ... },
  createItem: async (endpoint, data) => { ... },

  // 2. Reemplazamos la función de login simulada
  login: async (usuario, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, password }) // Asumo que tu backend espera 'usuario'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    // El backend debería devolver { success: true, user: { name: '...', role: '...' } }
    return response.json();
  }
};

export default apiService;