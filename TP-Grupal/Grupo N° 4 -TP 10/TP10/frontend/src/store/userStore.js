import { create } from 'zustand';

/**
 * ============================================================================
 * STORE DE AUTENTICACIÓN CON ZUSTAND (TAREA 5)
 * ============================================================================
 * Este store reemplaza completamente el uso de localStorage para autenticación.
 * 
 * ¿Por qué Zustand en lugar de localStorage?
 * - Estado reactivo: Los componentes se actualizan automáticamente cuando cambia
 * - Más seguro: No persiste tokens sensibles en el navegador
 * - Mejor rendimiento: Evita lectura/escritura constante del disco
 * - Más fácil de testear y mantener
 * 
 * FUNCIONALIDAD:
 * - Almacena user (datos del usuario) y token (JWT)
 * - Proporciona isAuthenticated para rutas protegidas
 * - Métodos para login (setAuth) y logout (clearAuth)
 * ============================================================================
 */
export const useAuthStore = create((set, get) => ({
  // ========== ESTADO GLOBAL ==========
  
  // user: Información del usuario logueado (username, email, rol)
  // null cuando no hay sesión activa
  user: null,
  
  // token: JSON Web Token (JWT) recibido del backend al hacer login
  // Se usa en TODAS las peticiones HTTP para autenticar al usuario
  token: null,
  
  // isAuthenticated: Bandera booleana para saber si hay un usuario logueado
  // Se usa en RouterProtect.jsx para proteger rutas privadas
  isAuthenticated: false,

  // ========== ACCIONES (MÉTODOS) ==========
  
  /**
   * setAuth: Guarda los datos del usuario y token después del login exitoso
   * Se llama desde Login.jsx cuando el backend responde 200 OK
   * @param {Object} user - Datos del usuario (username, email, rol)
   * @param {String} token - Token JWT del backend
   */
  setAuth: (user, token) => {
    set({ 
      user, 
      token, 
      isAuthenticated: true 
    });
  },

  /**
   * clearAuth: Limpia toda la información de autenticación (logout)
   * Se llama cuando:
   * - El usuario hace click en "Cerrar Sesión"
   * - El token expira (401/403 del backend)
   * - Error de autenticación
   */
  clearAuth: () => {
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false 
    });
  },

  /**
   * getToken: Obtiene el token JWT actual
   * Usado por el interceptor de axios en apiConfig.js
   * @returns {String|null} Token JWT o null si no hay sesión
   */
  getToken: () => get().token,

  /**
   * getUser: Obtiene la información del usuario actual
   * Útil para mostrar nombre de usuario en el UI
   * @returns {Object|null} Datos del usuario o null si no hay sesión
   */
  getUser: () => get().user,
}));
