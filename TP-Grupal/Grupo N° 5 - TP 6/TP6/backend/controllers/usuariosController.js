import pool from "../db.js";

export const getUsuarios = async (req, res) => {
  const [rows] = await pool.query("SELECT id, email, rol FROM usuarios");
  res.json(rows);
};

export const createUsuario = async (req, res) => {
  const { email, contrasenia, rol } = req.body;
  const [result] = await pool.query(
    "INSERT INTO usuarios (email, contrasenia, rol) VALUES (?, ?, ?)",
    [email, contrasenia, rol]
  );
  res.status(201).json({ id: result.insertId, email, rol });
};

export const loginUsuario = async (req, res) => {
  const { email, contrasenia } = req.body;
  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE email=? AND contrasenia=?",
    [email, contrasenia]
  );
  if (rows.length > 0) {
    res.json({ message: "Login exitoso", usuario: rows[0] });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};
