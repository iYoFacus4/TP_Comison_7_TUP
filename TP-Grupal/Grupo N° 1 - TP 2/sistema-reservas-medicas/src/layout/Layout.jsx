import React, { useEffect } from "react";
import { Container, Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Layout = ({ children }) => {
  const { user, isAuthenticated, logout, verifySession } = useAuth();
  const location = useLocation();

  // Re-verificar sesión cuando cambia la ruta o el componente se monta
  useEffect(() => {
    verifySession();
  }, [location.pathname, verifySession]);

  // Escuchar cambios en localStorage (para cuando se hace login desde otro tab/ventana)
  useEffect(() => {
    const handleStorageChange = () => {
      verifySession();
    };

    window.addEventListener("storage", handleStorageChange);

    // También crear un evento personalizado para cambios en el mismo tab
    const handleAuthChange = () => {
      verifySession();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, [verifySession]);

  const handleLogout = () => {
    logout(true); // true = redirigir al login
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Sistema Reservas Médicas
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  
                  {/* 👨‍⚕️ Link solo para MÉDICOS */}
                  {user?.role === "medico" && (
                    <Nav.Link as={Link} to="/agenda-pacientes">
                      Mi Agenda
                    </Nav.Link>
                  )}
                  
                  {/* 🩺 Link solo para PACIENTES */}
                  {user?.role === "paciente" && (
                    <Nav.Link as={Link} to="/mis-turnos">
                      Mis Turnos
                    </Nav.Link>
                  )}
                  
                  {/* 👥 Links administrativos - ADMIN y RECEPCIONISTA */}
                  {(user?.role === "admin" || user?.role === "recepcionista") && (
                    <>
                      <Nav.Link as={Link} to="/doctores">
                        Doctores
                      </Nav.Link>
                      <Nav.Link as={Link} to="/pacientes">
                        Pacientes
                      </Nav.Link>
                      <Nav.Link as={Link} to="/turnos">
                        Turnos
                      </Nav.Link>
                    </>
                  )}
                </>
              )}
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="outline-light"
                      size="sm"
                      id="user-dropdown"
                    >
                      {user?.email || "Usuario"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Header>{user?.email}</Dropdown.Header>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to="/perfil">
                        Mi Perfil
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/configuracion">
                        Configuración
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={handleLogout}
                        className="text-danger"
                      >
                        Cerrar Sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Iniciar Sesión
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
