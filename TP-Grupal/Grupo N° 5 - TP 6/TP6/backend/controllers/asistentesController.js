import pool from "../db.js";

export const getAsistentes = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM asistentes");
  res.json(rows);
};

export const getAsistenteById = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM asistentes WHERE id = ?", [req.params.id]);
  res.json(rows[0]);
};

export const createAsistente = async (req, res) => {
  const { nombre, apellido, fechaNac, dni, email, telefono } = req.body;
  const [result] = await pool.query(
    "INSERT INTO asistentes (nombre, apellido, fechaNac, dni, email, telefono) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, apellido, fechaNac, dni, email, telefono]
  );
  res.status(201).json({ id: result.insertId, ...req.body });
};

export const updateAsistente = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, fechaNac, dni, email, telefono } = req.body;
  await pool.query(
    "UPDATE asistentes SET nombre=?, apellido=?, fechaNac=?, dni=?, email=?, telefono=? WHERE id=?",
    [nombre, apellido, fechaNac, dni, email, telefono, id]
  );
  res.json({ message: "Asistente actualizado" });
};

export const deleteAsistente = async (req, res) => {
  await pool.query("DELETE FROM asistentes WHERE id = ?", [req.params.id]);
  res.json({ message: "Asistente eliminado" });
};
