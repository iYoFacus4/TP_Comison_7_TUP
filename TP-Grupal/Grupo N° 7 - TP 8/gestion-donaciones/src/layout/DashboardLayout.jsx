import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      
      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4">
        {/* Título del dashboard */}
        <div className="mb-4">
          <h2 className="p-3 bg-white shadow-sm rounded fw-bold text-primary">
            Dashboard de Gestión
          </h2>
        </div>

        {/* Contenido dinámico */}
        <Outlet />
      </div>
    </div>
  );
}
