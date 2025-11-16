const API_BASE_URL = 'http://localhost:5000';

const apiService = {
  // Función genérica para obtener todos los items de un endpoint
  getAll: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error al obtener datos de ${endpoint}`);
    }
    return response.json();
  },

  // Función genérica para actualizar un item por ID (útil para el registro de pagos)
  updateItem: async (endpoint, id, data) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
      method: 'PATCH', // Usamos PATCH para actualizar parcialmente
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

  // Función genérica para crear un nuevo item (útil para agregar deporte/socio)
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

  // Función específica para el login (simulado) - Requisito del profesor
  login: async (usuario, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Credenciales de prueba
        if (usuario === 'Niconeta97' && password === '12345') {
          resolve({ success: true, user: { username: usuario, role: 'admin' } });
        } else {
          reject({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
      }, 500);
    });
  }
};

export default apiService;