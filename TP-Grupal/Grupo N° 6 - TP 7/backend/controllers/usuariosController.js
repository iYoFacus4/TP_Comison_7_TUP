// Login y perfil (/me)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');


async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    console.log('[LOGIN] body:', req.body);

    const [rows] = await query(
      'SELECT id, email, password_hash, rol FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );
    console.log('[LOGIN] rows:', rows);

    const user = rows[0];
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.password_hash || '');
    console.log('[LOGIN] bcrypt.compare:', ok);

    if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '2h' }
    );

    return res.json({ token, user: { id: user.id, email: user.email, rol: user.rol } });
  } catch (err) {
    console.error('LOGIN_ERROR', err);
    return res.status(500).json({ message: 'Error interno' });
  }
}

async function me(req, res) {
  // req.user lo coloca el middleware
  return res.json({ user: req.user });
}

async function createUser(req, res) {
  try {
    const { email, password, rol } = req.body || {};

    if (!email || !password)
      return res.status(400).json({ message: 'email y password son requeridos' });

    // verificar si ya existe
    const [exists] = await query(
      'SELECT id FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );
    if (exists.length)
      return res.status(400).json({ message: 'Ese email ya está registrado' });

    // encriptar contraseña
    const hash = await bcrypt.hash(password, 10);

    await query(
      `INSERT INTO usuarios (email, password_hash, rol)
       VALUES (?, ?, ?)`,
      [email, hash, rol || 'user']
    );

    const [rows] = await query(
      'SELECT id, email, rol FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );

    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error('CREATE_USER_ERROR', err);
    return res.status(500).json({ message: 'Error interno' });
  }
}


module.exports = { login, me, createUser  };
