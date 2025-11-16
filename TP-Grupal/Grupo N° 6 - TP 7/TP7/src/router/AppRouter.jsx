import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from "../pages/dashboard/Dashboard";
import MiembrosPage from '../pages/MiembrosPage';
import ReportesPage from '../pages/ReportesPage';
import MainLayout from "../layout/MainLayOut.jsx";
import ProtectedRoute from '../components/ProtectedRoute'; 
import { useAuth } from '../context/AuthContext'; 

const AppRouter = () => {
 
  const { isAuthenticated } = useAuth(); 

  return (
    <Routes>
   
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
      />

  
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="miembros" element={<MiembrosPage />} />
        <Route path="reportes" element={<ReportesPage />} />
        
  
      </Route>

   
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;