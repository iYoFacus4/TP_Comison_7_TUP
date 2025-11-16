import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { AUTH_CONFIG } from "../config/app.config";

// Crear el contexto
const AuthContext = createContext(null);

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Verificar sesión al montar el componente
  useEffect(() => {
    verifySession();
  }, []);

  const verifySession = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await authService.verifySession();

      if (result.isValid && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Error al verificar sesión:", err);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.login(credentials);

      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return result;
      } else {
        setError(result.error);
        setIsAuthenticated(false);
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || "Error al iniciar sesión";
      setError(errorMessage);
      setIsAuthenticated(false);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.register(userData);

      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || "Error al registrar usuario";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(
    async (redirect = true) => {
      setIsLoading(true);

      try {
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        setError(null);

        if (redirect) {
          navigate(AUTH_CONFIG.LOGOUT_REDIRECT);
        }
      } catch (err) {
        console.error("Error al cerrar sesión:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const updateProfile = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.updateProfile(userData);

      if (result.success) {
        setUser(result.user);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || "Error al actualizar perfil";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.changePassword(
        currentPassword,
        newPassword
      );

      if (!result.success) {
        setError(result.error);
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || "Error al cambiar contraseña";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Verificar si el usuario tiene un rol específico
  const hasRole = useCallback((requiredRole) => {
    if (!user || !user.role) return false;
    
    // Si es array de roles, verificar si tiene alguno
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    // Si es un solo rol
    return user.role === requiredRole;
  }, [user]);

  const value = {
    // Estado
    user,
    isAuthenticated,
    isLoading,
    error,

    // Funciones
    login,
    logout,
    register,
    verifySession,
    updateProfile,
    changePassword,
    clearError,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuthContext debe ser usado dentro de un AuthProvider");
  }
  
  return context;
};

export default AuthContext;
