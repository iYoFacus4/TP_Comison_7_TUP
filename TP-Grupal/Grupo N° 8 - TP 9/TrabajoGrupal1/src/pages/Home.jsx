import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Club Social-Deportivo</h1>
          <p className="text-center text-muted">
            Sistema de Gestión de Socios, Deportes y Pagos
          </p>
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>⚽ Deportes</Card.Title>
              <Card.Text>
                Gestiona todos los deportes disponibles en el club
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>👥 Socios</Card.Title>
              <Card.Text>
                Administra la información de todos los socios del club
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>💰 Pagos</Card.Title>
              <Card.Text>
                Registra y consulta el estado de las cuotas mensuales
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="text-center">
          <Link to={ROUTES.LOGIN}>
            <Button variant="primary" size="lg">
              Acceder al Sistema
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;