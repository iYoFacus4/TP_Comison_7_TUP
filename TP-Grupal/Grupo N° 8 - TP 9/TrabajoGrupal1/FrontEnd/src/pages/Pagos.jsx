// FrontEnd/src/pages/Pagos.jsx (CÓDIGO COMPLETO Y FINAL)
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import PaymentTable from "../components/PaymentTable";
import "./Pagos.css";

// 1. IMPORTAMOS EL apiService
import apiService from "../services/apiService.js";

const Pagos = () => {
  // 2. ESTADOS LOCALES PARA DATOS, CARGA Y ERRORES
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [stats, setStats] = useState({
    totalPendiente: 0,
    cobradoEsteMes: 0,
    miembrosVencidos: 0,
  });

  // 3. useEffect PARA CARGAR DATOS DEL BACKEND REAL
  useEffect(() => {
    const loadPayments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Llama a la API
        const data = await apiService.getAll('cuotas');
        setPayments(data);

      } catch (err) {
        setError(err.message || "Error al cargar los pagos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPayments();
  }, []); // Se ejecuta solo una vez

  // 4. useEffect PARA CALCULAR ESTADÍSTICAS
  useEffect(() => {
    if (payments.length > 0) {
      
      const total = payments.reduce((sum, p) => {
        // CORRECCIÓN: Usamos parseFloat para asegurar que sea un número ANTES de sumar
        const montoNumerico = parseFloat(p.monto);
        if (p.estado !== "Pagado") return sum + montoNumerico; 
        return sum;
      }, 0);

      const collected = payments.reduce((sum, p) => {
        // CORRECCIÓN: Usamos parseFloat para asegurar que sea un número ANTES de sumar
        const montoNumerico = parseFloat(p.monto);
        if (p.estado === "Pagado") return sum + montoNumerico;
        return sum;
      }, 0);
      
      const overdue = payments.filter((p) => p.estado === "Vencido").length;

      setStats({
        totalPendiente: total,
        cobradoEsteMes: collected,
        miembrosVencidos: overdue,
      });
    }
  }, [payments]); // Se recalcula CADA VEZ que 'payments' cambie

  
  const handleGenerateReport = () => {
    console.log("Generando Reporte...");
    alert("Generando Reporte (ver consola)");
  };

  // 5. Función para formatear moneda (corregida)
  const formatCurrency = (amount) => {
    return Number(amount || 0)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // 6. MANEJO DE ESTADOS DE CARGA Y ERROR
  if (error) {
    return <div className="pagos-page" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="pagos-page">
      {/* 7. ENCABEZADO CORREGIDO Y COMPLETO */}
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

      {/* Cards de estadísticas (con 'isLoading') */}
      {isLoading ? (
        <div className="stats-cards">Cargando estadísticas...</div>
      ) : (
        <div className="stats-cards">
          {/* Total Pendiente */}
          <div className="stat-card">
            <div className="stat-label">Total Pendiente</div>
            <div className="stat-value">
              ${formatCurrency(stats.totalPendiente)}
            </div>
          </div>
          {/* Cobrado Este Mes */}
          <div className="stat-card collected">
            <div className="stat-label">Cobrado Este Mes</div>
            <div className="stat-value green">
              ${formatCurrency(stats.cobradoEsteMes)}
            </div>
          </div>
          {/* Miembros con Deuda */}
          <div className="stat-card overdue">
            <div className="stat-label">Miembros con Deuda</div>
            <div className="stat-value red">{stats.miembrosVencidos}</div>
          </div>
        </div>
      )}

      {/* 8. TABLA DE PAGOS */}
      {isLoading ? (
        <div>Cargando tabla de pagos...</div>
      ) : (
        <PaymentTable 
          payments={payments} 
          setPayments={setPayments} 
          setError={setError}
        />
      )}
    </div>
  );
};

export default Pagos;