// Rutas de autenticación y perfil de usuario
// POST /api/usuarios/login   -> login (público)
// GET  /api/usuarios/me      -> perfil (requiere token)

const express = require('express');
const router = express.Router();
const { login, me, createUser } = require('../controllers/usuariosController');
const { authRequired,adminOnly } = require('../middleware/authMiddleware');

// Login (devuelve { token, user })
router.post('/login', login);

// Perfil del usuario autenticado (lee req.user del middleware)
router.get('/me', authRequired, me);

// crear usuario (solo admin)
router.post('/', authRequired, adminOnly, createUser);

module.exports = router;
