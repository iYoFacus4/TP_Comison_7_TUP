import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Productos";
import Clientes from "../pages/Clientes";
import Ventas from "../pages/Ventas";
import Reportes from "../pages/Reportes";
import HistorialVentas from "../pages/Historialventas";
import RouterProtect from "./RouterProtect";

const AppRouter = () => {
  return (
    <Routes>
      {/* RUTA PÚBLICA */}
      <Route path="/" element={<Login />} />

      {/* RUTAS PROTEGIDAS */}
      <Route element={<RouterProtect />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/historial-ventas" element={<HistorialVentas />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
