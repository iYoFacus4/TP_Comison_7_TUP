import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { logout, getSession } from '../utils/auth';

export default function AppLayout() {
  const nav = useNavigate();
  const session = getSession();

  const handleLogout = () => { logout(); nav('/login', { replace: true }); };

  return (
    <Container fluid className="min-vh-100">
      <Row>
        <Col md={3} lg={2} className="p-3" style={{background:'#0b1220', minHeight:'100vh'}}>
          <div className="fw-bold mb-1">📚 TP4 Grupo 9</div>
          <div className="text-secondary mb-3" style={{fontSize:12}}>{session?.email}</div>
          <Nav className="flex-column gap-2">
            <NavLink to="/" className="btn btn-outline-light">Dashboard</NavLink>
          </Nav>
          <Button variant="outline-danger" className="mt-4" onClick={handleLogout}>Cerrar sesión</Button>
        </Col>
        <Col md={9} lg={10} className="p-4" style={{background:'#0f172a'}}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
