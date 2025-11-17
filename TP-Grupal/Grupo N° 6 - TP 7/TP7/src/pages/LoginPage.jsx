// TP7/src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const token = useAuthStore(s => s.token);
  const error = useAuthStore(s => s.error);
  const loading = useAuthStore(s => s.loading);
  const loginAsync = useAuthStore(s => s.loginAsync);

  useEffect(() => {
  if (token) {
    const user = useAuthStore.getState().user;
    if (user.rol === 'admin') navigate('/dashboard');
    else navigate('/usuario');
  }
}, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await loginAsync(formData.email, formData.password);

if (ok) {
  const user = useAuthStore.getState().user;
  if (user.rol === 'admin') navigate('/dashboard');
  else navigate('/usuario');
}
  };

  return (
    <Container fluid className="vh-100 login-bg">
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={12} md={8} lg={6} xl={4}>
          <Card className="shadow-lg border-0" style={{ backgroundColor: '#a9b5beff' }}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Bienvenido</h2>
                <p className="text-muted">Ingresa a tu cuenta</p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-4">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ejemplo@email.com"
                    required
                    size="lg"
                    className="bg-light"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    size="lg"
                    className="bg-light"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="text-uppercase fw-bold"
                    disabled={loading}
                  >
                    {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
