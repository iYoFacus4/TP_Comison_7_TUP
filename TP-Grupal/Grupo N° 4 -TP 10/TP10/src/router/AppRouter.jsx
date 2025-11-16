import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import MainLayout from '../layout/MainLayout';
import RouterProtect from './RouterProtect'; 


import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Clients from '../pages/Clients';
import Services from '../pages/Services';
import Appointments from '../pages/Appointments';

export default function AppRouter() {
  const isLogged = localStorage.getItem('isLogged') === 'true';

  return (
    <Routes>
     
      <Route
        path="/"
        element={isLogged ? <Navigate to="/app/dashboard" replace /> : <Login />}
      />

      
      <Route
        path="/app"
        element={
          <RouterProtect>
            <MainLayout />
          </RouterProtect>
        }
      >
       
        <Route index element={<Navigate to="dashboard" replace />} />
        
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clientes" element={<Clients />} />
        <Route path="servicios" element={<Services />} />
        <Route path="turnos" element={<Appointments />} />
      </Route>

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}