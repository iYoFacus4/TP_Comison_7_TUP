import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function RequireAdmin() {
  const user = useAuthStore((state) => state.user);

 
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

 
  return <Outlet />;
}