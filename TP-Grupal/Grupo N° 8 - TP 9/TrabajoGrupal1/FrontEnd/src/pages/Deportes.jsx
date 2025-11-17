// FrontEnd/src/pages/Deportes.jsx (MODIFICADO)
import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import SportsTable from "../components/SportsTable"; // Tu tabla
import "./Deportes.css";

// 1. IMPORTAMOS EL apiService
import apiService from "../services/apiService.js";

const Deportes = () => {
  // 2. ESTADOS PARA DATOS, CARGA Y ERRORES
  const [deportes, setDeportes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 3. ESTADO PARA ESTADÍSTICAS (AHORA CARGADO DESDE EL BACKEND)
  const [stats, setStats] = useState({
    totalDeportes: 0,
    deportesActivos: 0,
    totalMiembros: 0, // Nota: Este dato sigue siendo el falso
  });

  // 4. Ref para llamar a la función 'openAddModal' del hijo (SportsTable)
  const sportsTableRef = useRef();

  // 5. useEffect PARA CARGAR DATOS DEL BACKEND REAL
  useEffect(() => {
    const loadDeportes = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // ¡Aquí llamamos a tu API!
        const data = await apiService.getAll('deportes');
        setDeportes(data);

        // Calculamos estadísticas (basadas en los datos del backend)
        const total = data.length;
        const active = data.filter((s) => s.estado === "Activo").length;
        
        // ADVERTENCIA: Este cálculo sigue usando el dato erróneo 'miembros'
        // Lo correcto sería que el backend nos diera este número.
        const members = data.reduce((sum, s) => sum + (s.miembros || 0), 0);

        setStats({
          totalDeportes: total,
          deportesActivos: active,
          totalMiembros: members, // Lo mostramos por ahora
        });

      } catch (err) {
        setError(err.message || "Error al cargar los deportes.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDeportes();
  }, []); // Se ejecuta solo una vez

  // Función para abrir el modal de "Agregar" en SportsTable
  const handleAddNewSport = () => {
    if (sportsTableRef.current) {
      sportsTableRef.current.openAddModal();
    }
  };

  // 6. RENDERIZADO CON ESTADOS DE CARGA Y ERROR
  if (error) {
    return <div className="deportes-page" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="deportes-page">
      {/* Header (sin cambios) */}
      <div className="deportes-header">
        <h1 className="page-title">Gestión de Deportes</h1>
        <Button
          variant="primary"
          className="add-sport-btn"
          onClick={handleAddNewSport} // Llama a la función del ref
        >
          <i className="bi bi-plus-lg me-2"></i>
          Agregar Nuevo Deporte
        </Button>
      </div>

      {/* Cards de estadísticas (con 'isLoading') */}
      {isLoading ? (
        <div className="stats-cards">Cargando estadísticas...</div>
      ) : (
        <div className="stats-cards">
          {/* (Tus 3 cards de estadísticas se quedan igual) */}
          <div className="stat-card">
            <div className="stat-label">Total Deportes</div>
            <div className="stat-value">{stats.totalDeportes}</div>
          </div>
          <div className="stat-card collected">
            <div className="stat-label">Deportes Activos</div>
            <div className="stat-value green">{stats.deportesActivos}</div>
          </div>
          <div className="stat-card overdue">
            <div className="stat-label">Total de Miembros (Simulado)</div>
            <div className="stat-value red">{stats.totalMiembros}</div>
          </div>
        </div>
      )}

      {/* 7. TABLA DE DEPORTES (AHORA PASAMOS LOS DATOS COMO PROPS) */}
      {isLoading ? (
        <div>Cargando tabla de deportes...</div>
      ) : (
        <SportsTable
          ref={sportsTableRef} // Pasamos la ref
          initialDeportes={deportes} // Pasamos los datos
          setGlobalError={setError} // Pasamos una forma de setear errores
        />
      )}
    </div>
  );
};

export default Deportes;