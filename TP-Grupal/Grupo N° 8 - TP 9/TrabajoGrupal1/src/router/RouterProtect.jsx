import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const RouterProtect = ({ children }) => {
  // Lógica de protección: verifica si existe la clave 'isAuthenticated'
  // El Login.jsx se encarga de guardar 'true' aquí si las credenciales son correctas.
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Si no está autenticado, lo redirige a la página de Login
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default RouterProtect;