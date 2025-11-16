import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import SportsTable from "../components/SportsTable";
import "./Deportes.css";

const Deportes = () => {
  const [stats, setStats] = useState({
    totalDeportes: 0,
    deportesActivos: 0,
    totalMiembros: 0,
  });
  const sportsTableRef = useRef(null);

  // Calcular estadísticas desde LocalStorage
  useEffect(() => {
    const sports = JSON.parse(localStorage.getItem("sports") || "[]");
    
    const total = sports.length;
    const active = sports.filter((s) => s.estado === "Activo").length;
    const members = sports.reduce((sum, s) => sum + (s.miembros || 0), 0);

    setStats({
      totalDeportes: total,
      deportesActivos: active,
      totalMiembros: members,
    });
  }, []);

  const handleAddNewSport = () => {
    if (sportsTableRef.current) {
      sportsTableRef.current.openAddModal();
    }
  };

  return (
    <div className="deportes-page">
      {/* Header del componente */}
      <div className="deportes-header">
        <h1 className="page-title">Gestión de Deportes</h1>
        <Button
          variant="primary"
          className="add-sport-btn"
          onClick={handleAddNewSport}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Agregar Nuevo Deporte
        </Button>
      </div>

      {/* Cards de estadísticas */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-label">Total de Deportes</div>
          <div className="stat-value">{stats.totalDeportes}</div>
        </div>
        <div className="stat-card active">
          <div className="stat-label">Deportes Activos</div>
          <div className="stat-value green">{stats.deportesActivos}</div>
        </div>
        <div className="stat-card members">
          <div className="stat-label">Total de Miembros</div>
          <div className="stat-value blue">{stats.totalMiembros}</div>
        </div>
      </div>

      {/* Tabla de deportes */}
      <SportsTable ref={sportsTableRef} />
    </div>
  );
};

export default Deportes;
