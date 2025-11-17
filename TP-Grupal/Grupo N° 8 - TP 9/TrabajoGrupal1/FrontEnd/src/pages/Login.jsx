// FrontEnd/src/pages/Login.jsx (CORREGIDO Y COMPLETO)
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
// 1. IMPORTAMOS ZUSTAND
import { useAuthStore } from '../store/useAuthStore.js';
// (Ya no necesitamos 'apiService' aquí)

const Login = () => {
  const navigate = useNavigate();
  // 2. OBTENEMOS LA ACCIÓN 'login' DE ZUSTAND
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  
  // 3. AÑADIMOS OTRA VEZ 'rememberMe' PORQUE EL JSX LO NECESITA
  const [rememberMe, setRememberMe] = useState(false);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  // 4. NUEVA LÓGICA 'handleSubmit' (CON ZUSTAND)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 5. SIMULAMOS LA LÓGICA DE LOGIN (como pide la S3)
    // Verificamos contra el usuario de prueba
    if (formData.usuario === 'Niconeta97' && formData.password === '12345') {
      
      const userData = {
        username: formData.usuario,
        rol: 'admin' // Simulamos un rol
      };

      // 6. ¡AQUÍ USAMOS ZUSTAND! (y borramos localStorage)
      login(userData);

      navigate(ROUTES.DASHBOARD, { replace: true });

    } else {
      setError('Usuario o contraseña incorrectos');
    }
    
    setIsLoading(false);
  };

  // 7. PEGADO TODO EL 'return' DEL ARCHIVO 'Login(antes).jsx'
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary mb-2">Club Social-Deportivo</h2>
                <p className="text-muted">Iniciar Sesión</p>
              </div>

              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsuario">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="usuario"
                    placeholder="Ingrese su usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check 
                    type="checkbox"
                    id="rememberMe"
                    label="Recordarme"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Funcionalidad de recuperación de contraseña próximamente');
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Ingresando...' : 'Ingresar'}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <small className="text-muted">
                  Sistema de Gestión - Panel de Administración
                </small>
              </div>
            </Card.Body>
          </Card>

          {/* Credenciales de prueba */}
          <Card className="mt-3 border-info">
            <Card.Body className="py-2 text-center">
              <small className="text-muted">
                <strong>Prueba:</strong> Usuario: <code>Niconeta97</code> | Contraseña: <code>12345</code>
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;