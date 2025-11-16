// backend/routes/alumnos.routes.js
const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM alumnos');
    res.json(rows);
  } catch (error) {
    console.error('Error GET /alumnos', error);
    res.status(500).json({ message: 'Error al obtener alumnos' });
  }
});

router.post('/', async (req, res) => {
  const { nombre, dni } = req.body;
  if (!nombre || !dni) {
    return res.status(400).json({ message: 'Nombre y DNI son obligatorios' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO alumnos (nombre, dni) VALUES (?, ?)',
      [nombre, dni]
    );
    const [rows] = await db.query('SELECT * FROM alumnos WHERE id = ?', [
      result.insertId
    ]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error POST /alumnos', error);
    res.status(500).json({ message: 'Error al crear alumno' });
  }
});

router.put('/:id', async (req, res) => {
  const { nombre, dni } = req.body;
  try {
    await db.query(
      'UPDATE alumnos SET nombre = ?, dni = ? WHERE id = ?',
      [nombre, dni, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM alumnos WHERE id = ?', [
      req.params.id
    ]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error PUT /alumnos/:id', error);
    res.status(500).json({ message: 'Error al actualizar alumno' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM alumnos WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (error) {
    console.error('Error DELETE /alumnos/:id', error);
    res.status(500).json({ message: 'Error al eliminar alumno' });
  }
});

module.exports = router;
