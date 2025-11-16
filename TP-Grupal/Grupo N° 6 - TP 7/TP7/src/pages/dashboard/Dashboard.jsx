import React from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../../hooks/useFetch';
import { getMiembros } from '../../services/miembrosService';
import { getDataCards } from '../../services/reportesService';
import CardComponent from '../../components/Card';
import TablaUser from '../../components/TablaUser';
import { PeopleFill, PersonCheckFill, PersonXFill } from 'react-bootstrap-icons';

const Dashboard = () => {
  const { data: metrics, loading: loadingMetrics, error: errorMetrics } = useFetch(getDataCards);
  const { data: users, loading: loadingUsers, error: errorUsers } = useFetch(getMiembros);

  const loading = loadingMetrics || loadingUsers;
  const error = errorMetrics || errorUsers;

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3 fs-4">Cargando panel...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h1 className="h2">Dashboard</h1>
        </Col>
      </Row>

      {metrics && (
        <Row className="mb-4">
          <CardComponent
            titulo="Miembros Totales"
            valor={metrics.totalSocios}
            variante="primary"
            icono={<PeopleFill />}
          />
          <CardComponent
            titulo="Miembros Activos"
            valor={metrics.sociosActivos}
            variante="success"
            icono={<PersonCheckFill />}
          />
          <CardComponent
            titulo="Miembros Inactivos"
            valor={metrics.sociosInactivos}
            variante="danger" 
            icono={<PersonXFill />}
          />
        </Row>
      )}

      <Row>
        <Col>
          <h2 className="h4 mb-3">Usuarios</h2>
          {users && <TablaUser usuarios={users} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;