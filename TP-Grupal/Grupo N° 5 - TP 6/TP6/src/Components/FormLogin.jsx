import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getUsuarioPorEmail } from '../Utils/utils';
import { useEffect } from 'react';
function Login() {
    const [email, setEmail] = useState("")
    const [contrasenia, setContrasena] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
      const log = localStorage.getItem("usuarioLogueado")
      if(log === "Si") {
        navigate('/dashboard')
      }
    }, [])

    const handleSubmit = (e) => {
      const usuario = getUsuarioPorEmail(email)
        e.preventDefault();
        if(usuario != null ) {
          if(contrasenia === usuario.contrasenia) {
          localStorage.setItem('usuarioLogueado', 'Si');
          localStorage.setItem('Usuario', JSON.stringify(usuario));
          navigate('/dashboard')
          } else{
            alert("Contraseña Incorrecta")
          }
        } else {
          alert("El Usuario No Existe")
        }
    }
  return (
    <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: " #2c3e50",
    }}
  >
    <Form
      onSubmit={handleSubmit}
      style={{
        width: "350px",
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setContrasena(e.target.value)}
        />
      </Form.Group>

      <Button  type="submit" style={{ width: "100%" }}>
        INICIAR SESIÓN
      </Button>
    </Form>
  </div>
  );
}

export default Login;