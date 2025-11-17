import pool from '../db/db.js';


export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getProduct = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) 
      return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, talle, color } = req.body;
    
  
    if (!name || !price) {
      return res.status(400).json({ message: "Nombre y Precio son obligatorios" });
    }

    const [result] = await pool.query(
      'INSERT INTO products (name, price, stock, talle, color) VALUES (?, ?, ?, ?, ?)',
      [name, price, stock || 0, talle || '', color || '']
    );
    
    
    res.json({
      id: result.insertId,
      name, price, stock, talle, color
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, talle, color } = req.body;

    const [result] = await pool.query(
      'UPDATE products SET name = ?, price = ?, stock = ?, talle = ?, color = ? WHERE id = ?',
      [name, price, stock, talle, color, id]
    );

    if (result.affectedRows === 0) 
      return res.status(404).json({ message: 'Producto no encontrado' });

  
    res.json({ id, name, price, stock, talle, color });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) 
      return res.status(404).json({ message: 'Producto no encontrado' });

    res.sendStatus(204); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};