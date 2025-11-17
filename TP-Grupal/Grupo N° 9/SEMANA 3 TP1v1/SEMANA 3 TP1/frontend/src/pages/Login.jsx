// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth';
import { useAuthStore } from '../store/authStore';

// IMPORTAMOS LAS IMÁGENES DE FONDO
import bg1 from '../img/bg1.webp';
import bg2 from '../img/bg2.jpg';
import bg3 from '../img/bg3.jpeg';

const BACKGROUNDS = [bg1, bg2, bg3];

export default function Login() {
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('admin@biblioteca.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  // índice de la imagen actual
  const [currentBg, setCurrentBg] = useState(0);

  // cada 7 segundos cambiamos a la siguiente imagen
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { token, user } = await AuthService.login(email, password);
      loginStore(user, token); // guardamos en Zustand
      navigate('/'); // ruta protegida
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-page">
      {/* Capas de fondo con transición suave */}
      <div className="login-bg">
        {BACKGROUNDS.map((img, index) => (
          <div
            key={index}
            className={`login-bg-layer ${
              index === currentBg ? 'is-active' : ''
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* Contenido del login */}
      <div className="login-content">
        <h1 className="login-title">Login Biblioteca</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@biblioteca.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Contraseña</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn btn-primary w-100 mt-2" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
