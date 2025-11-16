import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner, Alert } from "react-bootstrap";

/**
 * Componente para proteger rutas que requieren autenticación y/o roles específicos
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente hijo a renderizar si pasa la validación
 * @param {string|string[]} props.requiredRole - Rol o roles requeridos para acceder (opcional)
 * @param {string} props.redirectTo - Ruta de redirección si no cumple requisitos (default: /login)
 */
const RouterProtect = ({ children, requiredRole = null, redirectTo = "/login" }) => {
  const { isAuthenticated, isLoading, user, hasRole } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Verificando sesión...</span>
        </Spinner>
        <p className="mt-3 text-muted">Verificando sesión...</p>
      </div>
    );
  }

  // Redirigir al login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si se requiere un rol específico, verificar
  if (requiredRole) {
    const hasRequiredRole = hasRole(requiredRole);

    if (!hasRequiredRole) {
      // No tiene el rol requerido - mostrar mensaje de acceso denegado
      return (
        <div className="container mt-5">
          <Alert variant="danger">
            <Alert.Heading>Acceso Denegado</Alert.Heading>
            <p>
              No tienes permisos para acceder a esta sección.
            </p>
            <p className="mb-0">
              <strong>Rol requerido:</strong> {Array.isArray(requiredRole) ? requiredRole.join(", ") : requiredRole}
            </p>
            <p>
              <strong>Tu rol actual:</strong> {user?.role || "Sin rol asignado"}
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Navigate to="/dashboard" replace />
            </div>
          </Alert>
        </div>
      );
    }
  }

  // Renderizar el contenido protegido
  return children;
};

export default RouterProtect;
