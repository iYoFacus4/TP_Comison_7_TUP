import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <h1 className="display-1">404</h1>
      <h2>Página no encontrada</h2>
      <p className="text-muted mb-4">
        La página que buscas no existe o ha sido movida
      </p>
      <Link to={ROUTES.HOME}>
        <Button variant="primary">Volver al inicio</Button>
      </Link>
    </Container>
  );
};

export default NotFound;