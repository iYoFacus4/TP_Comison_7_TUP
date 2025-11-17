import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import concertImage from '../assets/pers.jpg';
import { useAuthStore } from '../Store/authStore';



function Login() {
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

useEffect(() => {
    if (user) {
      console.log("Login: Usuario ya logueado, redirigiendo...", user);
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3006/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasenia })
      });

      const data = await res.json();

      if (res.ok) {
        login(data.usuario);
        alert("Login exitoso!");
        navigate('/dashboard');
      } else {
        alert(data.error || "Credenciales incorrectas");
      }

    } catch (error) {
      alert("Error al contactar el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
 <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${concertImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Form
        onSubmit={handleSubmit}
        style={{
          width: '380px', 
          padding: '80px 20px',
          borderRadius: '15px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)', // El efecto "blur"
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
      >
         <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '35px',   
            gap: '15px'             
          }}
        >
          <img 
            src="https://img.icons8.com/ios-filled/50/ffffff/ticket.png"
            alt="Logo Eventos"
            style={{ 
              width: '50px', // Tamaño del logo
              height: '50px' 
            }} 
          />
          <h2 
            style={{
              color: 'white',
              margin: 0, // Quitamos márgenes por defecto
              fontWeight: 'bold',
              fontSize: '4rem' // Tamaño del texto "Eventos"
            }}
          >
            Eventos
          </h2>
        </div>

        <h3 className="text-center mb-4" style={{ }}>
          BIENVENIDOS
        </h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setContrasenia(e.target.value)}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          />
        </Form.Group>

        <Button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            marginTop: '10px',
            padding: '10px 0',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #3a98c4ff, #1874ddff)',
            border: 'none'
          }}
        >
         {loading ? 'INGRESANDO...' : 'INICIAR SESIÓN'}
        </Button>
      </Form>
    </div>
  );
}

export default Login;
