// src/dashboard/DashboardSidebar.jsx
import { useEffect, useState } from "react";
import { Card, Nav, ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { getBooks, getLoans } from "../store/dataService";

export default function DashboardSidebar() {
  const location = useLocation();
  const [libros, setLibros] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setLibros(getBooks());
    setPrestamos(getLoans());
  }, []);

  const totalLibros = libros.length;
  const librosPrestados = prestamos.length;
  const librosDisponibles = libros.reduce(
    (acc, l) => acc + (l.cantidadDisponible || 0),
    0
  );

  const navItems = [
    { path: "/libros", label: "📚 Libros" },
    { path: "/alumnos", label: "👩‍🎓 Alumnos" },
    { path: "/prestamos", label: "📖 Préstamos" },
  ];

  return (
    <div className="bg-light border-end vh-100 p-3 overflow-auto">
      <h5 className="text-center mb-3 fw-bold">Panel de Biblioteca</h5>

      {/* 🔹 Métricas de préstamos */}
<div className="mb-4">
  <Card className="mb-2 text-center shadow-sm border-success">
    <Card.Body>
      <Card.Title className="text-success fw-semibold">
        🟢 Préstamos Activos
      </Card.Title>
      <Card.Text className="fw-bold fs-4">
        {
          getLoans().filter(p => {
            const diff = Math.ceil((new Date(p.fechaDevolucion) - new Date()) / (1000 * 60 * 60 * 24));
            return diff > 2; // activos si faltan más de 2 días
          }).length
        }
      </Card.Text>
    </Card.Body>
  </Card>

  <Card className="mb-2 text-center shadow-sm border-warning">
    <Card.Body>
      <Card.Title className="text-warning fw-semibold">
        🟡 Préstamos por Vencer
      </Card.Title>
      <Card.Text className="fw-bold fs-4">
        {
          getLoans().filter(p => {
            const diff = Math.ceil((new Date(p.fechaDevolucion) - new Date()) / (1000 * 60 * 60 * 24));
            return diff > 0 && diff <= 2; // por vencer
          }).length
        }
      </Card.Text>
    </Card.Body>
  </Card>

  <Card className="mb-3 text-center shadow-sm border-danger">
    <Card.Body>
      <Card.Title className="text-danger fw-semibold">
        🔴 Préstamos Vencidos
      </Card.Title>
      <Card.Text className="fw-bold fs-4">
        {
          getLoans().filter(p => {
            const diff = Math.ceil((new Date(p.fechaDevolucion) - new Date()) / (1000 * 60 * 60 * 24));
            return diff <= 0; // vencidos
          }).length
        }
      </Card.Text>
    </Card.Body>
  </Card>
</div>
      {/* Navegación */}
      <Nav className="flex-column mb-4">
        {navItems.map((item) => (
          <Nav.Link
            as={Link}
            to={item.path}
            key={item.path}
            active={location.pathname === item.path}
            className="mb-2"
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
      </div> );
}