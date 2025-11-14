import { Navigate, useLocation, Outlet } from 'react-router-dom'; 
import { useAuthStore } from '../store/authStore'; 

export default function RouterProtect() {

 const isLogged = useAuthStore((state) => state.isLogged());
 const location = useLocation();

  if (!isLogged) {
   return <Navigate to="/" state={{ from: location }} replace />;
  }

 
 return <Outlet />; 
}