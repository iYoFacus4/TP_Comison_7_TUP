// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from "../pages/dashboard/Dashboard";
import MiembrosPage from '../pages/MiembrosPage';
import ReportesPage from '../pages/ReportesPage';
import MainLayout from "../layout/MainLayOut.jsx";
import ProtectedRoute from '../components/ProtectedRoute';
import { AdminRoute, UserRoute } from '../components/RoleRoute';
import HomeUsuario from '../pages/usuarios/HomeUsuario.jsx';
import { useAuthStore } from '../store/auth';

const AppRouter = () => {
  const token = useAuthStore(s => s.token);
  const user = useAuthStore(s => s.user);

  return (
    <Routes>

      {/* LOGIN */}
      <Route
        path="/login"
        element={token ? (
          user?.rol === "admin"
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/usuario" replace />
        ) : (
          <LoginPage />
        )}
      />

      {/* 🔵 RUTAS ADMIN (con sidebar) */}
      <Route
        path="/"
        element={
          <AdminRoute>
            <MainLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="miembros" element={<MiembrosPage />} />
        <Route path="reportes" element={<ReportesPage />} />
      </Route>

      {/* 🟢 RUTAS USUARIO */}
      <Route
  path="/usuario"
  element={
    <UserRoute>
      <MainLayout />
    </UserRoute>
  }
>
  <Route index element={<HomeUsuario />} />
  <Route path="home" element={<HomeUsuario />} />
  <Route path="reservas" element={<HomeUsuario />} />
</Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
};

export default AppRouter;
