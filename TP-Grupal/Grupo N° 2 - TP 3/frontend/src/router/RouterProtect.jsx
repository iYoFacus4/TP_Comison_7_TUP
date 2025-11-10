// ej: frontend/src/router/RouterProtect.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; 

export default function RouterProtect({ children }) {

  const isLogged = useAuthStore((state) => state.isLogged());
  const location = useLocation();

  if (!isLogged) {
   
    return <Navigate to="/" state={{ from: location }} replace />;
  }


  return children;
}