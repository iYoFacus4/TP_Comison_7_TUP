import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../utils/auth";

export default function Login(){
  const nav = useNavigate();
  const [email,setEmail] = useState("");
  const [pass,setPass]   = useState("");
  const [err,setErr]     = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if(!email || !pass){ setErr("Completá usuario y contraseña"); return; }
    setAuth({ user: email, token: "fake-token" });
    nav("/dashboard", { replace: true });
  };

  return (
    // Fondo con imagen MUCHO más visible + overlay oscuro
    <div className="bg-cover bg-login" style={{ "--bg-image": "url(/img/fondo1.jpg)" }}>
      <Row className="justify-content-center min-vh-100 align-items-center">
        <Col sm={10} md={7} lg={5} xl={4}>
          {/* Tarjeta negra estilo HL2 (oscura y contrastada) */}
          <Card className="login-card card-appear shadow-xl" style={{ "--i": "0s" }}>
            <Card.Body>
              <Card.Title className="mb-3 text-center text-light">Iniciar sesión</Card.Title>

              {err && <Alert variant="warning">{err}</Alert>}

              <Form onSubmit={onSubmit} className="form-dark">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    placeholder="tu@email.com"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={pass}
                    onChange={e=>setPass(e.target.value)}
                    placeholder="••••••••"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" className="btn-hl2">Entrar</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
