// Verifica JWT y adjunta req.user
const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
  try {
    const h = req.headers.authorization || '';
    const token = h.startsWith('Bearer ') ? h.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Token requerido' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, rol }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function adminOnly(req, res, next) {
  if (req.user?.rol !== 'admin') {
    return res.status(403).json({ message: 'Solo administradores' });
  }
  next();
}



module.exports = { authRequired, adminOnly};
