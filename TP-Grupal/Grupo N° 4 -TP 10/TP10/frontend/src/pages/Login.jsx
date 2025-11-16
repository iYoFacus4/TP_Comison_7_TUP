/**
 * ============================================================================
 * PÁGINA DE LOGIN - INTEGRACIÓN CON BACKEND (TAREA 5)
 * ============================================================================
 * CAMBIOS PRINCIPALES respecto a la versión anterior:
 * 
 * ANTES (con localStorage):
 * - Validación hardcodeada: if (username === 'admin' && password === '1234')
 * - Guardaba en localStorage: localStorage.setItem('isLogged', 'true')
 * - Sin comunicación con backend
 * 
 * AHORA (con backend + Zustand):
 * - Hace POST a /auth/login del backend
 * - Valida credenciales contra base de datos MySQL
 * - Recibe token JWT del servidor
 * - Guarda user + token en Zustand (estado global, NO localStorage)
 * - Redirige al dashboard solo si el backend responde exitoso
 * 
 * FLUJO:
 * 1. Usuario ingresa username/password
 * 2. Se valida que no estén vacíos
 * 3. Se hace POST a backend con las credenciales
 * 4. Backend valida contra MySQL y devuelve {success, data: {user, token}}
 * 5. Se guarda en Zustand con setAuth(user, token)
 * 6. Se navega a /app/dashboard
 * ============================================================================
 */

import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 
import { useAuthStore } from '../store/userStore'; // Hook de Zustand para auth
import apiClient from '../services/apiConfig'; // Instancia de axios configurada
import "../styles/login.css";
import logo from "../assets/barb.png";


export default function Login() {
  // ========== ESTADO LOCAL DEL FORMULARIO ==========
  const [username, setUsername] = useState(""); // Campo username
  const [password, setPassword] = useState(""); // Campo password
  const [error, setError] = useState(""); // Mensaje de error para mostrar
  const [loading, setLoading] = useState(false); // Estado de carga durante la petición
  
  // ========== HOOKS DE NAVEGACIÓN Y ZUSTAND ==========
  const navigate = useNavigate(); // Para redirigir después del login exitoso
  const setAuth = useAuthStore((state) => state.setAuth); // Función para guardar auth en Zustand

  // ========== MANEJADOR DEL SUBMIT ==========
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de página
    setError(""); // Limpiar errores anteriores

    // Validación básica: campos no vacíos
    if (username.trim() === "" || password.trim() === "") {
      setError("⚠️ Complete todos los campos");
      return;
    }

    setLoading(true); // Activar estado de carga

    try {
      // ========== PETICIÓN AL BACKEND ==========
      // POST a /api/auth/login con username y password
      // apiClient ya tiene configurado el baseURL y headers
      const response = await apiClient.post('/auth/login', {
        username: username.trim(),
        password: password.trim()
      });

      // ========== PROCESAMIENTO DE RESPUESTA EXITOSA ==========
      // El backend devuelve: {success: true, data: {token, user}}
      if (response.data.success) {
        const { token, user } = response.data.data;
        
        // Guardar en Zustand (NO en localStorage)
        // Esto actualiza el estado global y hace isAuthenticated = true
        setAuth(user, token);
        
        // Navegar al dashboard
        // replace: true previene volver al login con el botón "atrás"
        navigate('/app/dashboard', { replace: true });
      }
    } catch (err) {
      // ========== MANEJO DE ERRORES ==========
      console.error('Error en login:', err);
      
      // Mostrar mensaje de error del backend o uno genérico
      setError(
        err.response?.data?.message || 
        "❌ Usuario o contraseña incorrectos"
      );
    } finally {
      // Desactivar estado de carga sin importar si fue exitoso o error
      setLoading(false);
    }
  };

  // ========== RENDERIZADO DEL FORMULARIO ==========
  return (
    <div className="login-container">
      <Card className="login-card shadow-lg">
        <Card.Body>
          {/* Logo y título de la aplicación */}
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="logo"
              className="login-logo"
            />
            <h3 className="fw-bold text-dark">Peluquería</h3>
            <p className="text-muted mb-0">Sistema de Turnos</p>
          </div>

          {/* Formulario de login */}
          <Form onSubmit={handleSubmit}>
            {/* Campo de usuario */}
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading} // Deshabilitar durante la carga
              />
            </Form.Group>

            {/* Campo de contraseña */}
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading} // Deshabilitar durante la carga
              />
            </Form.Group>

            {/* Mensaje de error (si existe) */}
            {error && <p className="text-danger">{error}</p>}

            {/* Botón de submit con estado de carga */}
            <Button 
              type="submit" 
              variant="primary" 
              className="w-100 mt-2"
              disabled={loading} // Deshabilitar durante la carga
            >
              {/* Texto dinámico según el estado */}
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
