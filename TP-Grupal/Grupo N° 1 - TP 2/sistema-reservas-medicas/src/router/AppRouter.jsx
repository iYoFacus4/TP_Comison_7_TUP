import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Dashboard from "../dashboard/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Pacientes from "../pages/Pacientes";
import Doctores from "../pages/Doctores";
import Turnos from "../pages/Turnos";
import Profile from "../pages/Profile";
import MyAppointments from "../pages/MyAppointments";
import PatientAppointments from "../pages/PatientAppointments";
import RouterProtect from "./RouterProtect";
import { ROLES_USUARIO } from "../constants";

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Ruta protegida general - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RouterProtect>
              <Dashboard />
            </RouterProtect>
          }
        />

        {/* Ruta protegida para todos los usuarios autenticados - Perfil */}
        <Route
          path="/perfil"
          element={
            <RouterProtect>
              <Profile />
            </RouterProtect>
          }
        />

        {/* Rutas protegidas solo para PACIENTES */}
        <Route
          path="/mis-turnos"
          element={
            <RouterProtect requiredRole={ROLES_USUARIO.PACIENTE}>
              <MyAppointments />
            </RouterProtect>
          }
        />

        {/* Rutas protegidas solo para MÉDICOS */}
        <Route
          path="/agenda-pacientes"
          element={
            <RouterProtect requiredRole={ROLES_USUARIO.MEDICO}>
              <PatientAppointments />
            </RouterProtect>
          }
        />

        {/* Rutas administrativas - Requieren rol ADMIN o RECEPCIONISTA */}
        <Route
          path="/pacientes"
          element={
            <RouterProtect requiredRole={[ROLES_USUARIO.ADMIN, ROLES_USUARIO.RECEPCIONISTA]}>
              <Pacientes />
            </RouterProtect>
          }
        />
        <Route
          path="/doctores"
          element={
            <RouterProtect requiredRole={[ROLES_USUARIO.ADMIN, ROLES_USUARIO.RECEPCIONISTA]}>
              <Doctores />
            </RouterProtect>
          }
        />
        <Route
          path="/turnos"
          element={
            <RouterProtect requiredRole={[ROLES_USUARIO.ADMIN, ROLES_USUARIO.RECEPCIONISTA]}>
              <Turnos />
            </RouterProtect>
          }
        />
      </Routes>
    </Layout>
  );
};

export default AppRouter;
