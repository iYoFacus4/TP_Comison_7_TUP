import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../Store/authStore';

const RutaPrivada = () => {
const user = useAuthStore((state) => state.user); 

  const isLogged = !!user; 

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RutaPrivada;