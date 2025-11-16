/**
 * ============================================================================
 * COMPONENTE DE RUTAS PROTEGIDAS - ROUTER PROTECT (TAREA 5)
 * ============================================================================
 * Este componente protege las rutas privadas de la aplicación.
 * Solo permite acceder si el usuario está autenticado.
 * 
 * CAMBIOS PRINCIPALES respecto a la versión anterior:
 * 
 * ANTES (con localStorage):
 * const isLogged = localStorage.getItem('isLogged') === 'true';
 * - Leía del localStorage en cada renderizado
 * - Vulnerable a manipulación del usuario desde DevTools
 * - No reactivo (no se actualiza automáticamente)
 * 
 * AHORA (con Zustand):
 * const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
 * - Lee del estado global de Zustand
 * - Reactivo: se actualiza automáticamente cuando cambia
 * - Más seguro: no persiste en el navegador
 * - Limpio: se borra automáticamente al cerrar la pestaña
 * 
 * FUNCIONAMIENTO:
 * 1. useAuthStore obtiene isAuthenticated del store
 * 2. Si es false: Redirige al login (página '/')
 * 3. Si es true: Renderiza los children (la página protegida)
 * 
 * USO:
 * <RouterProtect>
 *   <Dashboard />
 * </RouterProtect>
 * ============================================================================
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/userStore';

export default function RouterProtect({ children }) {
  // ========== VERIFICACIÓN DE AUTENTICACIÓN ==========
  // Obtener isAuthenticated del store de Zustand
  // Este hook hace que el componente se re-renderice cuando cambia isAuthenticated
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // Obtener la ubicación actual para poder redirigir de vuelta después del login
  const location = useLocation();

  // ========== CONTROL DE ACCESO ==========
  if (!isAuthenticated) {
    // Usuario NO autenticado -> Redirigir al login
    // state: { from: location } permite recordar a dónde quería ir el usuario
    // replace: true reemplaza la entrada en el historial (no se puede volver atrás)
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // ========== ACCESO PERMITIDO ==========
  // Usuario autenticado -> Renderizar la página solicitada (children)
  return children;
}