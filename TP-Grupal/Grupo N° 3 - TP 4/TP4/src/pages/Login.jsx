import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { Eye, EyeOff } from "lucide-react";

export default function Login(){
  const nav = useNavigate();
  const [email,setEmail] = useState("");
  const [pass,setPass]   = useState("");
  const [show,setShow]   = useState(false);
  const [err,setErr]     = useState("");
  const [loading,setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if(!email || !pass){
      setErr("Completá email y contraseña");
      return;
    }
// luego de validar usuario...
// setAuth({ user: email, role: email === "admin@escuela.edu" ? "admin" : "user", name: email, token: "fake-token" });

    try {
      setLoading(true);
      await authService.login(email, pass);
      nav("/dashboard", { replace: true });
    } catch (error) {
      setErr(error.message || "Error de inicio de sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cover bg-login" style={{ "--bg-image": "url(/img/fondo1.jpg)" }}>
      <Row className="justify-content-center min-vh-100 align-items-center">
        <Col sm={10} md={7} lg={5} xl={4}>
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
                    placeholder="admin@escuela.edu"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={show ? "text" : "password"}
                      value={pass}
                      onChange={e=>setPass(e.target.value)}
                      placeholder="••••••••"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={()=>setShow(s=>!s)}
                      title={show ? "Ocultar" : "Mostrar"}
                    >
                      {show ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" className="btn-hl2" disabled={loading}>
                    {loading ? "Ingresando..." : "Entrar"}
                  </Button>
                </div>

                <div className="mt-3 small text-muted">
                  Usuario demo: <code>admin@escuela.edu</code> — Pass: <code>1234</code>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
