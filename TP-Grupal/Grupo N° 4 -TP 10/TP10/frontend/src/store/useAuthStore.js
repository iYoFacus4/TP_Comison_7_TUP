import { create } from 'zustand';

/**
 * Store de Zustand para manejo de autenticación
 * Reemplaza localStorage y gestiona el estado global del usuario y token JWT
 */
export const useAuthStore = create((set, get) => ({
  // Estado
  user: null,
  token: null,
  isAuthenticated: false,

  // Acciones
  setAuth: (user, token) => {
    set({ 
      user, 
      token, 
      isAuthenticated: true 
    });
  },

  clearAuth: () => {
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false 
    });
  },

  // Getter para obtener el token (útil para interceptores)
  getToken: () => get().token,

  // Getter para obtener el usuario actual
  getUser: () => get().user,
}));
