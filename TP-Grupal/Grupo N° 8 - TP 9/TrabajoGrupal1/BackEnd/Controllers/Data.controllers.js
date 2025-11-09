import pool from '../db.js';

// GET /api/deportes
export const getAllDeportes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM deportes');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener deportes:', error);
    res.status(500).json({ message: 'Error al obtener deportes' });
  }
};

// GET /api/pagos
export const getAllPagos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pagos ORDER BY fecha DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    res.status(500).json({ message: 'Error al obtener pagos' });
  }
};