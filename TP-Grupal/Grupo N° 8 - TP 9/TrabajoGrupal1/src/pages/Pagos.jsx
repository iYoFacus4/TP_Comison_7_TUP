import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import PaymentTable from "../components/PaymentTable";
import "./Pagos.css";
import useFetch from "../hooks/useFetch"; 

const Pagos = () => {
  // 1. Usamos el Custom Hook para obtener los datos de pagos
  const { data: payments, isLoading, error } = useFetch("/payments");
  
  const [stats, setStats] = useState({
    totalPendiente: 0,
    cobradoEsteMes: 0,
    miembrosVencidos: 0,
  });

  // 2. Calcular estadísticas cuando los datos de 'payments' cambien
  useEffect(() => {
    if (payments) { 
      const total = payments.reduce((sum, p) => {
        if (p.estado !== "Pagado") return sum + p.cuota;
        return sum;
      }, 0);

      const collected = payments.reduce((sum, p) => {
        if (p.estado === "Pagado") return sum + p.cuota;
        return sum;
      }, 0);
      
      const overdue = payments.filter((p) => p.estado === "Vencido").length;

      setStats({
        totalPendiente: total,
        cobradoEsteMes: collected,
        miembrosVencidos: overdue,
      });
    }
  }, [payments]); 

  
  const handleGenerateReport = () => {
   
    if (isLoading) {
      alert("Los datos aún se están cargando. Intente de nuevo en un momento.");
      return;
    }
    
    console.log("--- Generando Reporte Financiero ---");
    console.log("Funcionalidad de exportación aún no implementada.");
    console.log("Datos del Reporte:", stats);
   
    alert("Iniciando generación de Reporte (ver consola del navegador)");
  };

  const formatCurrency = (amount) => {
    return amount
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Si los datos están cargando o hay un error, mostramos un mensaje general
  if (error) return <div>Error al cargar la página de pagos: {error}</div>;

  return (
    <div className="pagos-page">
      {/* Header del componente */}
      <div className="pagos-header">
        <h1 className="page-title">Gestión de Cuotas Mensuales</h1>
        <Button
          variant="primary"
          className="generate-report-btn"
          onClick={handleGenerateReport}
        >
          <i className="bi bi-download me-2"></i>
          Generar Reporte
        </Button>
      </div>

      {/* Cards de estadísticas (Solo se muestran si los datos han cargado) */}
      {isLoading ? (
        <div className="stats-cards">Cargando estadísticas...</div>
      ) : (
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-label">Total Pendiente</div>
            <div className="stat-value">
              ${formatCurrency(stats.totalPendiente)}
            </div>
          </div>
          <div className="stat-card collected">
            <div className="stat-label">Cobrado Este Mes</div>
            <div className="stat-value green">
              ${formatCurrency(stats.cobradoEsteMes)}
            </div>
          </div>
          <div className="stat-card overdue">
            <div className="stat-label">Miembros con Deuda</div>
            <div className="stat-value red">{stats.miembrosVencidos}</div>
          </div>
        </div>
      )}

      {/* Tabla de pagos */}
      <PaymentTable />
    </div>
  );
};

export default Pagos;