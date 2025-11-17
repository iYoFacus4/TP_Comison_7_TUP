import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * @description Middleware de autenticación JWT
 * Verifica que el token JWT sea válido y agrega los datos del usuario a req.user
 */
export const authenticateToken = (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    // Verificar si existe el token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Acceso denegado. No se proporcionó token de autenticación.",
      });
    }

    // Verificar y decodificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Token inválido o expirado
        return res.status(403).json({
          success: false,
          message: "Token inválido o expirado.",
          error: err.message,
        });
      }

      // Token válido - agregar datos del usuario a la petición
      req.user = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        rol: decoded.rol,
      };

      // Continuar con la siguiente función
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en el middleware de autenticación.",
      error: error.message,
    });
  }
};

/**
 * @description Middleware para verificar roles específicos
 * @param {Array} roles - Array de roles permitidos ['admin', 'barbero', etc.]
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado.",
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(
          ", "
        )}`,
      });
    }

    next();
  };
};
