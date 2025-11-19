// FrontEnd/src/pages/Register.jsx
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import apiService from '../services/apiService'; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }
    
    // Asumimos rol 'socio' por defecto
    const data = {
      email: formData.email,
      password: formData.password,
      rol: 'socio'
    };

    try {
      // 1. Llamada a la API de Registro
      await apiService.register(data);
      
      setSuccess('¡Registro exitoso! Puedes iniciar sesión.');
      // Opcional: Navegar al login después de un breve tiempo
      setTimeout(() => navigate(ROUTES.LOGIN), 2000);

    } catch (err) {
      setError(err.message || 'Error de conexión o el email ya está registrado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary mb-2">Club Social-Deportivo</h2>
                <p className="text-muted">Crear Cuenta</p>
              </div>

              {error && (<Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>)}
              {success && (<Alert variant="success">{success}</Alert>)}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Ingrese su email" value={formData.email} onChange={handleChange} disabled={isLoading} autoFocus />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Ingrese su contraseña" value={formData.password} onChange={handleChange} disabled={isLoading} />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formConfirmPassword">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control type="password" name="confirmPassword" placeholder="Repita la contraseña" value={formData.confirmPassword} onChange={handleChange} disabled={isLoading} />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" type="submit" disabled={isLoading}>
                    {isLoading ? 'Registrando...' : 'Registrar'}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <Link to={ROUTES.LOGIN} className="text-decoration-none small">
                  Ya tengo cuenta
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;