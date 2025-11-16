/**
 * ============================================================================
 * APP ROUTER - CONFIGURACIÓN DE RUTAS (TAREA 5)
 * ============================================================================
 * Este componente define todas las rutas de la aplicación:
 * - Ruta pública: "/" (Login)
 * - Rutas privadas: "/app/*" (protegidas con RouterProtect)
 * 
 * CAMBIOS PRINCIPALES:
 * - Eliminado: localStorage.getItem('isLogged')
 * - Agregado: useAuthStore para verificar autenticación
 * ============================================================================
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/userStore'; // Para verificar autenticación

// Layouts
import MainLayout from '../layout/MainLayout';
import RouterProtect from './RouterProtect'; 

// Páginas
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Clients from '../pages/Clients';
import Services from '../pages/Services';
import Appointments from '../pages/Appointments';

export default function AppRouter() {
  // Obtener estado de autenticación desde Zustand
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      {/* Ruta raíz: Login o Dashboard según autenticación */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/app/dashboard" replace /> : <Login />}
      />

      {/* Rutas protegidas bajo /app */}
      <Route
        path="/app"
        element={
          <RouterProtect>
            <MainLayout />
          </RouterProtect>
        }
      >
        {/* Redirigir /app a /app/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        {/* Rutas de la aplicación */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clientes" element={<Clients />} />
        <Route path="servicios" element={<Services />} />
        <Route path="turnos" element={<Appointments />} />
      </Route>

      {/* Ruta catch-all: Redirigir cualquier ruta no definida al login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}