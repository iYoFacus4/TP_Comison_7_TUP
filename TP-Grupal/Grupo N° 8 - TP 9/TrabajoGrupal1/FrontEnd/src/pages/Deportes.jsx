import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import SportsTable from "../components/SportsTable";
import "./Deportes.css";
import apiService from "../services/apiService"; // 1. Importar el apiService

const Deportes = () => {
  const [stats, setStats] = useState({
    totalDeportes: 0,
    deportesActivos: 0,
    totalMiembros: 0,
  });
  // ... (el resto de tus estados y refs)

  // 2. Reemplazar el useEffect
  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        // Usamos la función genérica para llamar al endpoint 'deportes'
        const sports = await apiService.getAll('deportes'); 
        
        // La misma lógica de cálculo que ya tenías
        const total = sports.length;
        const active = sports.filter((s) => s.estado === "Activo").length;
        const members = sports.reduce((sum, s) => sum + (s.miembros || 0), 0);

        setStats({
          totalDeportes: total,
          deportesActivos: active,
          totalMiembros: members,
        });

      } catch (error) {
        console.error("Error al cargar deportes:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    };

    fetchSportsData();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // ... (el resto de tu componente se queda igual) ...
  // ... (handleAddNewSport, return, etc.)
  
  return (
    <div className="deportes-page">
      {/* ... (tu JSX) ... */}
    </div>
  );
};

export default Deportes;