/**
 * ============================================================================
 * MAIN LAYOUT - ESTRUCTURA PRINCIPAL DE LA APLICACIÓN
 * ============================================================================
 * Este componente define el layout principal con:
 * - Sidebar: Menú lateral con navegación y logout
 * - Content Area: Área donde se renderizan las páginas (Outlet)
 * 
 * CAMBIOS (TAREA 5):
 * - Eliminado: Botón de logout duplicado (ahora está solo en Sidebar)
 * - Eliminado: localStorage.removeItem('isLogged')
 * - El logout ahora se maneja completamente en Sidebar.jsx con Zustand
 * ============================================================================
 */

import { Outlet } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar';
import "../styles/layout.css"; 

export default function MainLayout() {
  return (
    <div className="layout-container">
      {/* Sidebar con navegación y botón de logout */}
      <Sidebar /> 
      
      {/* Área de contenido donde se renderizan las páginas */}
      <div className="layout-content">
        {/* Outlet renderiza la página actual según la ruta */}
        <Outlet />
      </div>
    </div>
  );
}