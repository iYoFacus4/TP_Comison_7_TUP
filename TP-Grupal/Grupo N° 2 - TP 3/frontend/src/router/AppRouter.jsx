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
import RequireAdmin from "./RequireAdmin";

const AppRouter = () => {
  return (
    <Routes>
   <Route element={<RouterProtect />}>
        
       
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/historial-ventas" element={<HistorialVentas />} />

     
    
        <Route element={<RequireAdmin />}>
           <Route path="/reportes" element={<Reportes />} />
        
        </Route>

      </Route>
      
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;