import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { loginFake } from '../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('123456');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginFake(email, password);
      nav('/', { replace: true });
    } catch {
      setErr('Credenciales inválidas');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: 'linear-gradient(120deg,#1f2937,#0f172a)' }}>
      <Row className="w-100" style={{maxWidth: 450}}>
        <Col>
          <Card className="p-3 shadow-lg">
            <Card.Body>
              <Card.Title className="mb-3">Iniciar sesión</Card.Title>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
                </Form.Group>
                {err && <Alert variant="danger" className="py-2">{err}</Alert>}
                <Button type="submit" className="w-100">Entrar</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
