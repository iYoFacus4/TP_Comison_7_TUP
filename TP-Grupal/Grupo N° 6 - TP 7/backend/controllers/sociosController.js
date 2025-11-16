// CRUD Socios (campos DB en snake_case -> JSON camelCase)
const { query } = require('../config/db');

function mapSocioRow(r) {
  return {
    id: r.id,
    name: r.nombre,
    email: r.email,
    telefono: r.telefono,
    plan: r.plan,
    status: r.status,
    fechaIngreso: r.fecha_ingreso,
  };
}

async function list(req, res) {
  const [rows] = await query('SELECT * FROM socios ORDER BY id DESC');
  return res.json(rows.map(mapSocioRow));
}

async function getById(req, res) {
  const id = Number(req.params.id);
  const [rows] = await query('SELECT * FROM socios WHERE id = ?', [id]);
  if (!rows.length) return res.status(404).json({ message: 'Socio no encontrado' });
  return res.json(mapSocioRow(rows[0]));
}

async function create(req, res) {
  const { name, email, telefono, plan, status, fechaIngreso } = req.body || {};
  if (!name || !email) return res.status(400).json({ message: 'name y email son requeridos' });

  await query(
    `INSERT INTO socios (nombre, email, telefono, plan, status, fecha_ingreso)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, telefono || null, plan || 'Básico', status || 'Activo', fechaIngreso || null]
  );

  const [rows] = await query('SELECT * FROM socios ORDER BY id DESC LIMIT 1');
  return res.status(201).json(mapSocioRow(rows[0]));
}

async function update(req, res) {
  const id = Number(req.params.id);
  const { name, email, telefono, plan, status, fechaIngreso } = req.body || {};

  const [exist] = await query('SELECT id FROM socios WHERE id = ?', [id]);
  if (!exist.length) return res.status(404).json({ message: 'Socio no encontrado' });

  await query(
    `UPDATE socios SET nombre = ?, email = ?, telefono = ?, plan = ?, status = ?, fecha_ingreso = ?
     WHERE id = ?`,
    [name, email, telefono, plan, status, fechaIngreso, id]
  );

  const [rows] = await query('SELECT * FROM socios WHERE id = ?', [id]);
  return res.json(mapSocioRow(rows[0]));
}

async function remove(req, res) {
  const id = Number(req.params.id);
  const [exist] = await query('SELECT id FROM socios WHERE id = ?', [id]);
  if (!exist.length) return res.status(404).json({ message: 'Socio no encontrado' });

  await query('DELETE FROM socios WHERE id = ?', [id]);
  return res.json({ ok: true });
}

module.exports = { list, getById, create, update, remove };
