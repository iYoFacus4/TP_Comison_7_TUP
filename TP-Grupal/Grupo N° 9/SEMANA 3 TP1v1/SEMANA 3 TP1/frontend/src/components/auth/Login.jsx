import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { fakeLogin } from "../../utils/authService";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [, setAuth] = useLocalStorage("auth", null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const resp = await fakeLogin({ email, password });
      setAuth(resp); // persiste en localStorage
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Error de login");
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: 500 }}>
      <h3>Iniciar sesión (simulado)</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        </Form.Group>
        <Button type="submit">Ingresar</Button>
      </Form>
    </Container>
  );
}
