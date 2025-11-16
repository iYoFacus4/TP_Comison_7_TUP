import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { AiOutlineBook } from 'react-icons/ai';

function Estudios() {
  return (
   
    <section id="estudios">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center text-white mb-4">
              <AiOutlineBook className="me-2" /> Mis Estudios
            </h2>
            <Card className="bg-dark text-white border-purple mb-3">
              <Card.Body>
                <Card.Title>Tecnicatura Universitaria en Programacion</Card.Title>
                <Card.Text>Universidad Tecnologica Nacional-FRT, 2023-2025</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Estudios;