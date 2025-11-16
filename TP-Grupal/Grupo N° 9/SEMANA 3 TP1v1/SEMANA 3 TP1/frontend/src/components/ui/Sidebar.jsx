import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Nav className="flex-column p-3">
      <h5 className="mb-3">Panel Admin</h5>
      <Nav.Link as={Link} to="/dashboard">📊 Dashboard</Nav.Link>
      <Nav.Link as={Link} to="/courses">📚 Cursos</Nav.Link>
      <Nav.Link as={Link} to="/students">👩‍🎓 Alumnos</Nav.Link>
      <Nav.Link as={Link} to="/enrollments">📝 Inscripciones</Nav.Link>
    </Nav>
  );
}
