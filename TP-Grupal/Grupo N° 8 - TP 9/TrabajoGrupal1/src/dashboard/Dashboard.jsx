import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSocios: 0,
    totalDeportes: 0,
    totalAsociaciones: 0,
    pagosDelMes: 0,
    deudaPendiente: 0
  });

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setStats({
        totalSocios: 150,
        totalDeportes: 8,
        totalAsociaciones: 230,
        pagosDelMes: 120,
        deudaPendiente: 35000
      });
    }, 500);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  return (
    <>
      <div className='p-5 text-center'>
        <h1 className="mb-4 ">Dashboard - Panel de Control</h1>
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
                  <Link to={ROUTES.PAGOS} className="btn btn-outline-warning">
                    💵 Registrar Pago
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;