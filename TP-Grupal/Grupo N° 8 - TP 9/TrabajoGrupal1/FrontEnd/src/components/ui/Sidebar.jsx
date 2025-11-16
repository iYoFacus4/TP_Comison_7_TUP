// /FrontEnd/src/components/Sidebar/Sidebar.jsx (VERSION FINAL)

import { Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuthStore } from '../../store/useAuthStore'; // <-- 1. Importar Zustand
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  // Obtener la acción de logout y la función de verificación de rol
  const logout = useAuthStore((state) => state.logout); 
  const isAdmin = useAuthStore((state) => state.isAdmin); 

  // Definición de ítems con sus roles requeridos
  const baseMenuItems = [
    {
      path: ROUTES.DASHBOARD,
      icon: 'bi-grid-fill', // Icono de Dashboard
      label: 'Dashboard',
      exact: true
    },
    {
      path: ROUTES.SOCIOS,
      icon: 'bi-people-fill', // Icono de Socios
      label: 'Socios',
      roles: ['administracion'] // Solo para el rol de administración
    },
    {
      path: ROUTES.DEPORTES,
      icon: 'bi-bicycle', // Icono de Deportes
      label: 'Deportes',
      roles: ['administracion']
    },
    {
      path: ROUTES.PAGOS,
      icon: 'bi-credit-card-fill', // Icono de Pagos
      label: 'Pagos',
      roles: ['administracion']
    }
  ];

  // Filtrar los elementos del menú basados en el rol del usuario logueado
  const menuItems = baseMenuItems.filter(item => {
    // Si el item no requiere roles, es visible (ej. Dashboard)
    if (!item.roles) return true;
    
    // Si el rol requerido es 'administracion', solo lo muestra si isAdmin() es true
    if (item.roles.includes('administracion')) {
      return isAdmin(); 
    }
    
    return false;
  });

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  const handleLogout = () => {
    logout(); // Ejecuta el cierre de sesión y limpia el estado de Zustand
  };

  return (
    <div className="sidebar bg-white shadow">
      <div className="sidebar-header p-3 border-bottom text-center">
        <h4 className="mb-0 text-black">Club Deportivo</h4>
        <small className="text-muted text-center">Panel de Administración</small>
      </div>

      <Nav className="flex-column p-3 flex-grow-1">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.path}
            as={Link}
            to={item.path}
            className={`text-dark sidebar-item ${
              isActive(item.path, item.exact) ? 'active' : ''
            }`}
          >
            <i className={`bi ${item.icon} me-2`}></i> {/* Usamos clases de iconos */}
            {item.label}
          </Nav.Link>
        ))}
      </Nav>

      {/* Botón de Logout usando la acción de Zustand */}
      <div className="p-3 border-top">
        <Button 
          variant="danger" 
          className="w-100" 
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;