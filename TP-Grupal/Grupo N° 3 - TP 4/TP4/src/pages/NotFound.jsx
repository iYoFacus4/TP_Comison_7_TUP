// NotFound.jsx — página 404 simple
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <h1 className="display-5 mb-2">404</h1>
      <p className="text-muted">La página que buscás no existe o fue movida.</p>
      <div className="d-flex gap-2">
        <Button as={Link} to="/dashboard" variant="primary">Volver al Dashboard</Button>
        <Button as={Link} to="/about" variant="outline-secondary">Ver guía del proyecto</Button>
      </div>
    </div>
  );
}
