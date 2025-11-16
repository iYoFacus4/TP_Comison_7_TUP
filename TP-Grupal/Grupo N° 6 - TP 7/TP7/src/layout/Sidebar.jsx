import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HouseDoorFill, CalendarCheckFill } from "react-bootstrap-icons";
import "./Sidebar.css";
import { useAuthStore } from "../store/auth";

const Sidebar = () => {
  const user = useAuthStore(s => s.user);

  // ADMIN → menú completo
  if (user?.rol === "admin") {
    return (
      <Nav className="flex-column bg-light h-100 d-flex shadow-sm p-3">
        <Nav.Link as={Link} to="/dashboard">
          <HouseDoorFill size={20} className="me-2" />
          Inicio
        </Nav.Link>

        <Nav.Link as={Link} to="/miembros">
          <HouseDoorFill size={20} className="me-2" />
          Miembros y Actividades
        </Nav.Link>

        <Nav.Link as={Link} to="/reportes">
          <HouseDoorFill size={20} className="me-2" />
          Reportes
        </Nav.Link>
      </Nav>
    );
  }

  // USER → menú reducido
  return (
    <Nav className="flex-column bg-light h-100 d-flex shadow-sm p-3">
      <Nav.Link as={Link} to="/usuario/home">
        <HouseDoorFill size={20} className="me-2" />
        Inicio
      </Nav.Link>

      <Nav.Link as={Link} to="/usuario/reservas">
        <CalendarCheckFill size={20} className="me-2" />
        Mis Reservas
      </Nav.Link>
    </Nav>
  );
};

export default Sidebar;
