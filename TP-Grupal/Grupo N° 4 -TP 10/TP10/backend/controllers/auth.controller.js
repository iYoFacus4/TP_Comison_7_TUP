import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connection from "../db/db.js";

dotenv.config();

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

/**
 * @route POST /api/auth/register
 * @desc Registrar un nuevo usuario
 * @access Public
 */
export const register = async (req, res) => {
  try {
    const { username, email, password, nombre, rol } = req.body;

    // Validar campos requeridos
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email y password son campos obligatorios.",
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Formato de email inválido.",
      });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener al menos 6 caracteres.",
      });
    }

    // Verificar si el usuario ya existe
    const [existingUsers] = await connection.query(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "El username o email ya están registrados.",
      });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insertar nuevo usuario
    const [result] = await connection.query(
      "INSERT INTO users (username, email, password, nombre, rol) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashedPassword, nombre || username, rol || "barbero"]
    );

    // Obtener el usuario creado (sin la contraseña)
    const [newUser] = await connection.query(
      "SELECT id, username, email, nombre, rol, fecha_registro FROM users WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente.",
      data: newUser[0],
    });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({
      success: false,
      message: "Error al registrar usuario.",
      error: error.message,
    });
  }
};

/**
 * @route POST /api/auth/login
 * @desc Iniciar sesión y obtener token JWT
 * @access Public
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar campos requeridos
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username y password son obligatorios.",
      });
    }

    // Buscar usuario por username o email
    const [users] = await connection.query(
      "SELECT id, username, email, password, nombre, rol, activo FROM users WHERE username = ? OR email = ?",
      [username, username]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas.",
      });
    }

    const user = users[0];

    // Verificar si el usuario está activo
    if (!user.activo) {
      return res.status(403).json({
        success: false,
        message: "Usuario inactivo. Contacte al administrador.",
      });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas.",
      });
    }

    // Actualizar último acceso
    await connection.query(
      "UPDATE users SET ultimo_acceso = NOW() WHERE id = ?",
      [user.id]
    );

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Responder con token y datos del usuario (sin contraseña)
    res.json({
      success: true,
      message: "Login exitoso.",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          nombre: user.nombre,
          rol: user.rol,
        },
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión.",
      error: error.message,
    });
  }
};

/**
 * @route GET /api/auth/me
 * @desc Obtener información del usuario autenticado
 * @access Private (requiere token)
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await connection.query(
      "SELECT id, username, email, nombre, rol, activo, fecha_registro, ultimo_acceso FROM users WHERE id = ?",
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    }

    res.json({
      success: true,
      data: users[0],
    });
  } catch (error) {
    console.error("Error en getProfile:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener perfil.",
      error: error.message,
    });
  }
};
