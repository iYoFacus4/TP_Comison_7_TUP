/**
 * ============================================================================
 * CONFIGURACIÓN DE AXIOS CON INTERCEPTORES JWT (TAREA 5)
 * ============================================================================
 * Este archivo configura una instancia de axios que:
 * 1. Se conecta al backend en http://localhost:3001/api
 * 2. Inyecta automáticamente el token JWT en TODAS las peticiones
 * 3. Maneja errores de autenticación (401/403) cerrando sesión automáticamente
 * 
 * ARQUITECTURA:
 * - Interceptor de REQUEST: Agrega header "Authorization: Bearer <token>"
 * - Interceptor de RESPONSE: Detecta errores de auth y hace logout
 * 
 * Este patrón asegura que NO tenemos que agregar el token manualmente
 * en cada servicio (clientService, appointmentService, hairServiceAPI)
 * ============================================================================
 */

import axios from 'axios';
import { useAuthStore } from '../store/userStore';

// ========== CONFIGURACIÓN BASE ==========

// Obtiene la URL del backend desde las variables de entorno (.env.local)
// Si no existe, usa http://localhost:3001/api por defecto
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Crear instancia personalizada de axios con configuración base
const apiClient = axios.create({
  baseURL: API_URL, // Todas las peticiones irán a esta URL base
  headers: {
    'Content-Type': 'application/json', // Enviamos y esperamos JSON
  },
});

// ========== INTERCEPTOR DE REQUEST (PETICIONES SALIENTES) ==========
/**
 * Este interceptor se ejecuta ANTES de que la petición salga al servidor.
 * Su función: Agregar el token JWT en el header Authorization
 */
apiClient.interceptors.request.use(
  (config) => {
    // Obtener el token actual del store de Zustand
    // useAuthStore.getState() accede al store sin necesidad de un hook
    const token = useAuthStore.getState().token;
    
    // Si hay token, agregarlo al header Authorization
    // Formato: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR..."
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Retornar la configuración modificada
    return config;
  },
  (error) => {
    // Si hay error antes de enviar la petición, rechazar la promesa
    return Promise.reject(error);
  }
);

// ========== INTERCEPTOR DE RESPONSE (RESPUESTAS ENTRANTES) ==========
/**
 * Este interceptor se ejecuta DESPUÉS de recibir la respuesta del servidor.
 * Su función: Detectar errores de autenticación y hacer logout automático
 */
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa (200, 201, etc.), devolverla sin modificar
    return response;
  },
  (error) => {
    // Si hay error, verificar si es un error de autenticación
    // 401 Unauthorized: Token inválido o expirado
    // 403 Forbidden: Token válido pero sin permisos para esta acción
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Limpiar la autenticación (logout)
      useAuthStore.getState().clearAuth();
      
      // Redirigir al login
      // Usamos window.location.href en lugar de navigate() porque
      // este interceptor no está en un componente React
      window.location.href = '/';
    }
    
    // Rechazar la promesa con el error para que el componente lo maneje
    return Promise.reject(error);
  }
);

// ========== EXPORTACIONES ==========

// Exportar la instancia de axios configurada (lo usarán todos los servicios)
export default apiClient;

// Exportar la URL base por si algún componente la necesita
export { API_URL };
