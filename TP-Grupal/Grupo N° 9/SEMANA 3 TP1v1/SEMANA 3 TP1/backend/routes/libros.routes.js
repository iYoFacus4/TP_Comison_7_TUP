// backend/routes/libros.routes.js
const express = require('express');
const db = require('../db');

const router = express.Router();

// GET /api/libros
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM libros');
    res.json(rows);
  } catch (error) {
    console.error('Error GET /libros', error);
    res.status(500).json({ message: 'Error al obtener libros' });
  }
});

// GET /api/libros/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM libros WHERE id = ?', [
      req.params.id
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error GET /libros/:id', error);
    res.status(500).json({ message: 'Error al obtener libro' });
  }
});

// POST /api/libros
router.post('/', async (req, res) => {
  const { titulo, autor, disponibles } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ message: 'Titulo y autor son obligatorios' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO libros (titulo, autor, disponibles) VALUES (?, ?, ?)',
      [titulo, autor, disponibles ?? 0]
    );
    const [rows] = await db.query('SELECT * FROM libros WHERE id = ?', [
      result.insertId
    ]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error POST /libros', error);
    res.status(500).json({ message: 'Error al crear libro' });
  }
});

// PUT /api/libros/:id
router.put('/:id', async (req, res) => {
  const { titulo, autor, disponibles } = req.body;
  try {
    await db.query(
      'UPDATE libros SET titulo = ?, autor = ?, disponibles = ? WHERE id = ?',
      [titulo, autor, disponibles ?? 0, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM libros WHERE id = ?', [
      req.params.id
    ]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error PUT /libros/:id', error);
    res.status(500).json({ message: 'Error al actualizar libro' });
  }
});

// DELETE /api/libros/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM libros WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (error) {
    console.error('Error DELETE /libros/:id', error);
    res.status(500).json({ message: 'Error al eliminar libro' });
  }
});

module.exports = router;
