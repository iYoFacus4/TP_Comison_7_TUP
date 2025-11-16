import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../components/common/input';
import Button from '../components/common/button';
import illustrationImage from '../assets/ilustration.png';
import FotoIndu from '../assets/fotoindu.png';
import Fotologo from '../assets/gancho.png';

const LoginContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.49); /* transparencia */
  z-index: 2; 
  color: #000000ff;
  
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 425px;
  background: transparent;
  border-radius: 50px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.15); /* transparencia */
  backdrop-filter: blur(10px); /* efecto vidrio */
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
    img {
    display: block;
    margin: 0 auto 30px auto; /* centra horizontal y deja margen abajo */
  }


`;


const IllustrationSection = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background-color: var(--light-bg);
    // Nota: El contenedor Styled-Component debe ser 'position: relative;'
    // si quieres que el div de fondo quede por debajo de la imagen.
    img {
      position: absolute;
      bottom: 0; 
      left: 0;
      width: 100%;
      height: auto;
      object-fit: cover;
      z-index: 1; 
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const MOCK_EMAIL = 'admin@tienda.com';
    const MOCK_PASSWORD = '123';

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      localStorage.setItem('userLogged', 'true');

      localStorage.setItem(
        'auth',
        JSON.stringify({
          email,
          role: 'admin',
          loggedAt: new Date().toISOString(),
        })
      );

      navigate('/dashboard');
    } else {
      setError(`Credenciales inválidas.`);
    }
  };

  return (
    <LoginContainer>
      <FormSection>
        <FormWrapper>
           {<img src={Fotologo} alt="Logo" style={{ width: '65px', marginBottom: '30px', }} />}
          <h2>Bienvenido a Nuestra Tienda</h2>
          <p>Ingresa tus credenciales para acceder al sistema.</p>

          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Input
              label="Correo Electrónico"
              id="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contraseña"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p style={{ color: 'red', margin: '0', fontWeight: '500' }}>{error}</p>
            )}

            <Button type="submit" variant="primary" style={{ marginTop: '10px',fontFamily: 'Poppins, sans-serif' }}>
              Ingresar
            </Button>
          </form>
        </FormWrapper>
      </FormSection>

      <IllustrationSection>
        <img src={FotoIndu} alt="Ilustración de tienda de ropa" /> 
      </IllustrationSection>
    </LoginContainer>
  );
};

export default Login;
