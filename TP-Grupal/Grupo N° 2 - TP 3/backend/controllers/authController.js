import pool from '../db/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [email]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];

   
    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

  
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
   
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [email, hash, 'admin']
    );

    res.json({ message: 'Usuario creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};