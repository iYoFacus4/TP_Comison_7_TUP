import pool from '../db/db.js';


export const getClients = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name as nombre, phone as telefono FROM clients');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createClient = async (req, res) => {
  try {
  
    const { nombre, telefono } = req.body; 
    
    const [result] = await pool.query(
      'INSERT INTO clients (name, phone) VALUES (?, ?)',
      [nombre, telefono]
    );
    
    res.json({ 
      id: result.insertId, 
      nombre, 
      telefono 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono } = req.body;

    const [result] = await pool.query(
      'UPDATE clients SET name = ?, phone = ? WHERE id = ?',
      [nombre, telefono, id]
    );

    if (result.affectedRows === 0) 
      return res.status(404).json({ message: 'Cliente no encontrado' });

    res.json({ message: 'Cliente actualizado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteClient = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM clients WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) 
      return res.status(404).json({ message: 'Cliente no encontrado' });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};