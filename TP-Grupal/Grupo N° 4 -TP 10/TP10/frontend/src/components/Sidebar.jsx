/**
 * ============================================================================
 * SIDEBAR - MENÚ LATERAL CON LOGOUT (TAREA 5)
 * ============================================================================
 * Componente de navegación lateral con:
 * - Links a Dashboard, Clientes, Servicios, Turnos
 * - Botón de "Cerrar Sesión" (logout)
 * - Indicador visual de la ruta activa
 * 
 * FUNCIONALIDAD DE LOGOUT AGREGADA:
 * - Botón "Cerrar Sesión" al final del sidebar
 * - Llama a clearAuth() de Zustand para limpiar el estado
 * - Redirige al login (página '/')
 * - Confirmación antes de cerrar sesión
 * ============================================================================
 */

// components/Sidebar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { ListGroup, Button } from "react-bootstrap";
import { House, Scissors, People, Calendar, BoxArrowRight } from "react-bootstrap-icons";
import { useAuthStore } from '../store/userStore'; // Para logout
import "../styles/sidebar.css";

export default function Sidebar() {
  // ========== HOOKS ==========
  const location = useLocation(); // Para saber en qué ruta estamos
  const navigate = useNavigate(); // Para redirigir al login después de logout
  const clearAuth = useAuthStore((state) => state.clearAuth); // Función de logout

  // ========== FUNCIONES AUXILIARES ==========
  
  /**
   * isActive: Verifica si una ruta está activa (para resaltarla visualmente)
   * @param {String} path - Ruta a verificar
   * @returns {Boolean} true si es la ruta actual
   */
  const isActive = (path) => location.pathname === path;

  /**
   * handleLogout: Maneja el cierre de sesión
   * 1. Confirma con el usuario
   * 2. Limpia el estado de autenticación (clearAuth)
   * 3. Redirige al login
   */
  const handleLogout = () => {
    // Confirmación antes de cerrar sesión
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      // Limpiar autenticación (user, token, isAuthenticated = false)
      clearAuth();
      
      // Redirigir al login
      // replace: true para que no pueda volver con el botón "atrás"
      navigate('/', { replace: true });
    }
  };

  // ========== RENDERIZADO DEL SIDEBAR ==========
  return (
    <div className="sidebar-container">
      {/* Título de la aplicación */}
      <h4 className="sidebar-title">💈 Peluquería</h4>
      
      {/* Lista de navegación */}
      <ListGroup variant="flush" className="sidebar-list">

        {/* Link a Dashboard */}
        <ListGroup.Item
          as={Link}
          to="/app/dashboard" 
          action
          active={isActive("/app/dashboard")} // Resaltar si está activo
          className="sidebar-item"
        >
          <House /> Dashboard
        </ListGroup.Item>

        {/* Link a Clientes */}
        <ListGroup.Item
          as={Link}
          to="/app/clientes"
          action
          active={isActive("/app/clientes")}
          className="sidebar-item"
        >
          <People /> Clientes
        </ListGroup.Item>

        {/* Link a Servicios */}
        <ListGroup.Item
          as={Link}
          to="/app/servicios"
          action
          active={isActive("/app/servicios")}
          className="sidebar-item"
        >
          <Scissors /> Servicios
        </ListGroup.Item>

        {/* Link a Turnos */}
        <ListGroup.Item
          as={Link}
          to="/app/turnos"
          action
          active={isActive("/app/turnos")}
          className="sidebar-item"
        >
          <Calendar /> Turnos
        </ListGroup.Item>
        

      </ListGroup>

      {/* Botón de Cerrar Sesión (TAREA 5) */}
      <div className="sidebar-footer mt-auto p-3">
        <Button 
          variant="outline-danger" 
          className="w-100"
          onClick={handleLogout} // Ejecuta clearAuth() y redirige a login
        >
          <BoxArrowRight /> Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}