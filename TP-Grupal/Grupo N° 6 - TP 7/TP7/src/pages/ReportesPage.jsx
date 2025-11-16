import React, { useState } from 'react';
import { Container, Row, Col, Table, Badge, Form, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import { getReportes } from '../services/reportesService';
import { getMiembros } from '../services/miembrosService';
import CardComponent from '../components/Card';
import { PeopleFill, PersonPlusFill, PersonDashFill, PieChartFill } from 'react-bootstrap-icons';

const ReportesPage = () => {
  const [periodo, setPeriodo] = useState('ultimo-mes');
  
  const { data: reporteData, loading: loadingReportes, error: errorReportes } = useFetch(getReportes);
  const { data: miembros, loading: loadingMiembros, error: errorMiembros } = useFetch(getMiembros);

  const loading = loadingReportes || loadingMiembros;
  const error = errorReportes || errorMiembros;

  // Calcular estadísticas
  const totalMiembros = miembros?.length || 0;
  const miembrosActivos = miembros?.filter(m => m.status === 'Activo').length || 0;
  const miembrosInactivos = miembros?.filter(m => m.status === 'Inactivo').length || 0;
  const planBasico = miembros?.filter(m => m.plan === 'Básico').length || 0;
  const planFull = miembros?.filter(m => m.plan === 'Full').length || 0;
  const porcentajeBasico = totalMiembros > 0 ? ((planBasico / totalMiembros) * 100).toFixed(1) : 0;
  const porcentajeFull = totalMiembros > 0 ? ((planFull / totalMiembros) * 100).toFixed(1) : 0;
  const porcentajeActivos = totalMiembros > 0 ? ((miembrosActivos / totalMiembros) * 100).toFixed(1) : 0;
  const porcentajeInactivos = totalMiembros > 0 ? ((miembrosInactivos / totalMiembros) * 100).toFixed(1) : 0;

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3 fs-4">Cargando reportes...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          Error al cargar los datos: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h1 className="h2">Reportes y Estadísticas</h1>
        </Col>
        <Col md={3}>
          <Form.Select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="ultimo-mes">Último Mes</option>
            <option value="ultimo-trimestre">Último Trimestre</option>
            <option value="año-actual">Año Actual</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Cards de métricas principales */}
      <Row className="mb-4">
        <CardComponent
          titulo="Total Miembros"
          valor={totalMiembros}
          variante="primary"
          icono={<PeopleFill />}
        />
        <CardComponent
          titulo="Nuevos Este Mes"
          valor={reporteData?.nuevosEsteMes || 0}
          variante="success"
          icono={<PersonPlusFill />}
        />
        <CardComponent
          titulo="Bajas Este Mes"
          valor={reporteData?.bajasEsteMes || 0}
          variante="danger"
          icono={<PersonDashFill />}
        />
        <CardComponent
          titulo="Miembros Activos"
          valor={miembrosActivos}
          variante="info"
          icono={<PieChartFill />}
        />
      </Row>

      {/* Tablas de distribución */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Distribución por Plan</h5>
            </div>
            <div className="card-body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Cantidad</th>
                    <th>Porcentaje</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Badge bg="secondary">Básico</Badge>
                    </td>
                    <td>{planBasico}</td>
                    <td>{porcentajeBasico}%</td>
                  </tr>
                  <tr>
                    <td>
                      <Badge bg="primary">Full</Badge>
                    </td>
                    <td>{planFull}</td>
                    <td>{porcentajeFull}%</td>
                  </tr>
                  <tr className="table-info">
                    <td><strong>Total</strong></td>
                    <td><strong>{totalMiembros}</strong></td>
                    <td><strong>100%</strong></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Distribución por Estado</h5>
            </div>
            <div className="card-body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Estado</th>
                    <th>Cantidad</th>
                    <th>Porcentaje</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Badge bg="success">Activo</Badge>
                    </td>
                    <td>{miembrosActivos}</td>
                    <td>{porcentajeActivos}%</td>
                  </tr>
                  <tr>
                    <td>
                      <Badge bg="danger">Inactivo</Badge>
                    </td>
                    <td>{miembrosInactivos}</td>
                    <td>{porcentajeInactivos}%</td>
                  </tr>
                  <tr className="table-info">
                    <td><strong>Total</strong></td>
                    <td><strong>{totalMiembros}</strong></td>
                    <td><strong>100%</strong></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>

      {/* Resumen mensual adicional */}
      <Row>
        <Col>
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Resumen del Período Seleccionado</h5>
            </div>
            <div className="card-body">
              <Row>
                <Col md={6}>
                  <p><strong>Período:</strong> {
                    periodo === 'ultimo-mes' ? 'Último Mes' :
                    periodo === 'ultimo-trimestre' ? 'Último Trimestre' :
                    'Año Actual'
                  }</p>
                  <p><strong>Nuevos miembros:</strong> {reporteData?.nuevosEsteMes || 0}</p>
                  <p><strong>Bajas:</strong> {reporteData?.bajasEsteMes || 0}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Miembros con plan Básico:</strong> {planBasico}</p>
                  <p><strong>Miembros con plan Full:</strong> {planFull}</p>
                  <p><strong>Tasa de retención:</strong> {
                    totalMiembros > 0
                      ? (((totalMiembros - (reporteData?.bajasEsteMes || 0)) / totalMiembros) * 100).toFixed(1)
                      : 0
                  }%</p>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportesPage;

