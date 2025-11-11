import pool from '../db/db.js';


export const getSales = async (req, res) => {
  try {
    
    const [rows] = await pool.query(`
      SELECT s.id, s.sale_date as fecha, s.total, c.name as clienteNombre 
      FROM sales s
      LEFT JOIN clients c ON s.clientId = c.id
      ORDER BY s.sale_date DESC
    `);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const createSale = async (req, res) => {
  
  const connection = await pool.getConnection();

  try {
    const { clientId, productos } = req.body;
    

    
    await connection.beginTransaction();

    
    const total = productos.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);

    
    const [saleResult] = await connection.query(
      'INSERT INTO sales (clientId, sale_date, total) VALUES (?, NOW(), ?)',
      [clientId, total]
    );
    const saleId = saleResult.insertId;

    
    for (const prod of productos) {
      
      await connection.query(
        'INSERT INTO sale_details (saleId, productId, quantity, unit_price) VALUES (?, ?, ?, ?)',
        [saleId, prod.productId, prod.cantidad, prod.precio]
      );

     
      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [prod.cantidad, prod.productId]
      );
    }

 
    await connection.commit();

    res.json({ message: 'Venta registrada exitosamente', saleId });

  } catch (error) {
    
    await connection.rollback();
    res.status(500).json({ message: 'Error al procesar la venta', error: error.message });
  } finally {
  
    connection.release();
  }
};


export const deleteSale = async (req, res) => {
  try {
  
    const [result] = await pool.query('DELETE FROM sales WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) 
      return res.status(404).json({ message: 'Venta no encontrada' });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};