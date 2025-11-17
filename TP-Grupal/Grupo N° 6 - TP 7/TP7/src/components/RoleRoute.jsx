import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export const AdminRoute = ({ children }) => {
  const user = useAuthStore(s => s.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.rol !== 'admin') return <Navigate to="/usuario" replace />;

  return children;
};

export const UserRoute = ({ children }) => {
  const user = useAuthStore(s => s.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.rol !== 'user') return <Navigate to="/dashboard" replace />;

  return children;
};
