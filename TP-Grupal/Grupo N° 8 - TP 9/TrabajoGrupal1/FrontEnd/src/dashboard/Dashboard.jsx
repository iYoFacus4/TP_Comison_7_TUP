import { useEffect, useState, useCallback } from 'react';
import { Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

// 1. IMPORTAMOS EL MODAL Y EL apiService
import RegisterPaymentModal from '../components/RegisterPaymentModal';
import apiService from '../services/apiService.js';

const Dashboard = () => {
  // 2. Estados de datos y modal
  const [stats, setStats] = useState({
    totalSocios: 0,
    totalDeportes: 0,
    pagosDelMes: 0,
    deudaPendiente: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // <-- ESTADO PARA MOSTRAR EL MODAL

  // 3. LÓGICA DE CARGA DE DATOS: encapsulada con useCallback para recargar
  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Llama al endpoint de estadísticas que creamos
      const data = await apiService.getAll('dashboard/stats');
      setStats(data);
    } catch (err) {
      setError(err.message || "Error al cargar estadísticas.");
    } finally {
      setIsLoading(false);
    }
  }, []); // El array vacío asegura que la función solo se crea una vez

  // 4. Se ejecuta al cargar (y cuando se llama a fetchStats indirectamente)
  useEffect(() => {
    fetchStats();
  }, [fetchStats]); // Se ejecuta cuando el componente se monta

  // 5. Función para formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount || 0); 
  };

  // 6. Renderizado condicional de carga/error
  if (isLoading) {
    return (
      <div className='p-5 text-center'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="p-5 text-center" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <>
      <div className='p-5 text-center'>
        <h1 className="mb-4 ">Dashboard - Panel de Control</h1>
        
        {/* 6a. Fila de Tarjetas de Estadísticas */}
        <Row className="g-4 mb-4 d-flex justify-content-center">
          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm border-primary">
              <Card.Body>
                <Card.Title className="text-muted">👥 Total Socios</Card.Title>
                <h2 className="mb-0">{stats.totalSocios}</h2>
                <Link to={ROUTES.SOCIOS} className="btn btn-sm btn-outline-primary mt-2">
                  Ver más
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm border-success">
              <Card.Body>
                <Card.Title className="text-muted">⚽ Deportes</Card.Title>
                <h2 className="mb-0">{stats.totalDeportes}</h2>
                <Link to={ROUTES.DEPORTES} className="btn btn-sm btn-outline-success mt-2">
                  Ver más
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm border-warning">
              <Card.Body>
                <Card.Title className="text-muted">💰 Pagos del Mes</Card.Title>
                <h2 className="mb-0">{stats.pagosDelMes}</h2>
                <Link to={ROUTES.PAGOS} className="btn btn-sm btn-outline-warning mt-2">
                  Ver más
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 6b. Fila de Resumen Financiero y Accesos Rápidos */}
        <Row className="g-4">
          <Col lg={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">📊 Resumen Financiero</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <span>Deuda Pendiente:</span>
                  <strong className="text-danger">
                    {formatCurrency(stats.deudaPendiente)}
                  </strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Pagos Recibidos (Mes):</span>
                  <strong className="text-success">
                    {stats.pagosDelMes} pagos
                  </strong>
                </div>
                <hr />
                <p className="text-muted mb-0">
                  <small>Última actualización: {new Date().toLocaleDateString('es-AR')}</small>
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">🎯 Accesos Rápidos</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Link to={ROUTES.SOCIOS} className="btn btn-outline-primary">
                    ➕ Registrar Nuevo Socio
                  </Link>
                  <Link to={ROUTES.DEPORTES} className="btn btn-outline-success">
                    ➕ Agregar Deporte
                  </Link>
                  <Button 
                    variant="warning" 
                    onClick={() => setShowPaymentModal(true)} // <-- ABRIR MODAL AL CLIC
                    className="btn btn-outline-warning"
                  >
                    💵 Registrar Pago
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      
      {/* 7. INVOCACIÓN DEL MODAL DE PAGO GLOBAL */}
      <RegisterPaymentModal
        show={showPaymentModal}
        handleClose={() => setShowPaymentModal(false)}
        onPaymentRegistered={fetchStats} // <-- RECÁRGALE LOS DATOS AL CERRAR EL MODAL
      />
    </>
  );
};

export default Dashboard;