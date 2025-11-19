import express from 'express';
import usuariosController from '../Controllers/usuariosController.js';


const router = express.Router();

// Ruta para registrarse (Crear usuario)
router.post('/register', usuariosController.register);

// Ruta para iniciar sesión (Login real)
router.post('/login', usuariosController.login);

export default router;