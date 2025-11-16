import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h2>Sistema de Reservas Médicas</h2>
            </Card.Header>
            <Card.Body>
              <p>Bienvenido al sistema de gestión de turnos médicos.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
