import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">ZavaGym</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#socios">Socios</Nav.Link>
          <Nav.Link href="#actividades">Actividades</Nav.Link>
        </Nav>
        <Nav className="align-items-center">
          {user?.email && <span className="text-light me-3">{user.email}</span>}
          <LogoutButton />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;