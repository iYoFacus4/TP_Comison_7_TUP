import  pool  from '../db/db.js';

// 1. OBTENER TODOS los productos
export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// 2. OBTENER UN producto
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// 3. CREAR un producto
export const createProduct = async (req, res) => {

    const { name, price, stock, talle, color } = req.body;
  
  try {
    const [result] = await pool.execute(
      'INSERT INTO products (name, price, stock, talle, color) VALUES (?, ?, ?, ?, ?)',
      [name, price, stock, talle, color]
    );
    
    const [newProduct] = await pool.execute('SELECT * FROM products WHERE id = ?', [result.insertId]);
    res.json(newProduct[0]);

  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// 4. ACTUALIZAR un producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, talle, color } = req.body;

    const [result] = await pool.execute(
      'UPDATE products SET name = ?, price = ?, stock = ?, talle = ?, color = ? WHERE id = ?',
      [name, price, stock, talle, color, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    const [updatedProduct] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    res.json(updatedProduct[0]);

  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// 5. ELIMINAR un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.sendStatus(204); 
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};