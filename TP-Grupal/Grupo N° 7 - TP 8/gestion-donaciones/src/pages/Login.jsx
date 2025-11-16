import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, InputGroup } from "react-bootstrap";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simulación de credenciales válidas
  const VALID_USER = "admin";
  const VALID_PASS = "1234";

  // Si ya hay sesión iniciada, redirige directamente al dashboard
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/SeccionDonaciones", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (user === VALID_USER && password === VALID_PASS) {
      localStorage.setItem("user", JSON.stringify({ name: user }));
      navigate("/SeccionDonaciones", { replace: true });
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="login-card shadow-lg">

        <h3 className="text-center mb-4 text-primary fw-bold">
          Iniciar Sesión
        </h3>

        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-person-fill"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Ingresá tu usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-lock-fill"></i>
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Ingresá tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mt-2 fw-semibold"
            variant="primary"
          >
            Ingresar
          </Button>
        </Form>

        <p className="text-muted text-center mt-3" style={{ fontSize: "0.9rem" }}>
          Usuario: <strong>admin</strong> — Contraseña: <strong>1234</strong>
        </p>
      </Card>
    </div>
  );
}
