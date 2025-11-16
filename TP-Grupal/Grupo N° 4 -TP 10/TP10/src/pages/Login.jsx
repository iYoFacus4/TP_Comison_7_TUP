import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 
import "../styles/login.css";
import logo from "../assets/barb.png";


export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

  
    const validUser = "admin";
    const validPass = "1234";

    if (user.trim() === "" || pass.trim() === "") {
      setError("⚠️ Complete todos los campos");
      return;
    }

 if (user === validUser && pass === validPass) {
      
localStorage.setItem("isLogged", "true"); 
      
     
 navigate('/app/dashboard', { replace: true });
 } else {
 setError("❌ Usuario o contraseña incorrectos");
 }
 };

  return (
    <div className="login-container">
      <Card className="login-card shadow-lg">
        <Card.Body>
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="logo"
              className="login-logo"
            />
            <h3 className="fw-bold text-dark">Peluquería</h3>
            <p className="text-muted mb-0">Sistema de Turnos</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button type="submit" variant="primary" className="w-100 mt-2">
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
