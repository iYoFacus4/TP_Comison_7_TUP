import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Form, Button, Container, Alert } from "react-bootstrap";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const admin = { email: "admin@academy.com", password: "admin123" };

    if (email === admin.email && password === admin.password) {
      const data = { email, role: "admin", isLogged: true };
      login(data);
      navigate("/dashboard");
    } else {
      setError("Credenciales incorrectas ❌");
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: 500 }}>
      <h3>Iniciar sesión (simulado)</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100">
          Ingresar
        </Button>
      </Form>
    </Container>
  );
}