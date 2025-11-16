import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ZavaGym</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#socios">Socios</Nav.Link>
            <Nav.Link href="#actividades">Actividades</Nav.Link>
          </Nav>
          <Nav>
            {user?.email && <span className="text-light me-3">{user.email}</span>}
            <LogoutButton />
          </Nav>
        </Container>
      </Navbar>
      
      <Container className="mt-4">
        <h1>Dashboard</h1>
        <p>Esta es la pagina principal (privada).</p>
        <p>El contenido (tabla con datos simulados) será agregado por otro integrante</p>
      </Container>
    </>
  );
};

export default DashboardPage;