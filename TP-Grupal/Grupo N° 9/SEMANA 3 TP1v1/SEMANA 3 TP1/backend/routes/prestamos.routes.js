// backend/routes/prestamos.routes.js
const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.*, l.titulo AS libroTitulo, a.nombre AS alumnoNombre
       FROM prestamos p
       JOIN libros l ON p.libroId = l.id
       JOIN alumnos a ON p.alumnoId = a.id`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error GET /prestamos', error);
    res.status(500).json({ message: 'Error al obtener prestamos' });
  }
});

router.post('/', async (req, res) => {
  const { libroId, alumnoId, fecha, devolucion } = req.body;
  if (!libroId || !alumnoId || !fecha) {
    return res.status(400).json({
      message: 'libroId, alumnoId y fecha son obligatorios'
    });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO prestamos (libroId, alumnoId, fecha, devolucion) VALUES (?, ?, ?, ?)',
      [libroId, alumnoId, fecha, devolucion ?? null]
    );
    const [rows] = await db.query('SELECT * FROM prestamos WHERE id = ?', [
      result.insertId
    ]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error POST /prestamos', error);
    res.status(500).json({ message: 'Error al crear prestamo' });
  }
});

router.put('/:id', async (req, res) => {
  const { libroId, alumnoId, fecha, devolucion } = req.body;
  try {
    await db.query(
      'UPDATE prestamos SET libroId = ?, alumnoId = ?, fecha = ?, devolucion = ? WHERE id = ?',
      [libroId, alumnoId, fecha, devolucion ?? null, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM prestamos WHERE id = ?', [
      req.params.id
    ]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error PUT /prestamos/:id', error);
    res.status(500).json({ message: 'Error al actualizar prestamo' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM prestamos WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (error) {
    console.error('Error DELETE /prestamos/:id', error);
    res.status(500).json({ message: 'Error al eliminar prestamo' });
  }
});

module.exports = router;
