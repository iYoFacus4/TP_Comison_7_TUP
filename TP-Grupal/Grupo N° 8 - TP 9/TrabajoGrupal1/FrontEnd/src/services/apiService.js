const API_BASE_URL = 'http://localhost:3001'; // Nuevo puerto base

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

  // 🔑 Función específica para el login (REAL)
  login: async (usuario, password) => {
    // 1. Envía la solicitud al endpoint de autenticación. Asumo la ruta '/auth/login'.
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 2. Envía el usuario y la contraseña en el cuerpo de la solicitud.
      body: JSON.stringify({ usuario, password }) 
    });

    // 3. Verifica si la respuesta HTTP es exitosa (código 200-299)
    if (!response.ok) {
      // Intenta obtener el mensaje de error del backend
      let errorMessage = 'Error al iniciar sesión';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Si no se puede leer el JSON de error, usa el mensaje por defecto
      }
      throw new Error(errorMessage);
    }

    // 4. Si es exitoso, devuelve la respuesta del servidor (que podría incluir un token).
    return response.json();
  }
};

export default apiService;