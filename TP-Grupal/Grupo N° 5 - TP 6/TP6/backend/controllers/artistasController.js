import pool from "../db.js";

export const getArtistas = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM artistas");
  res.json(rows);
};

export const getArtistaById = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM artistas WHERE id = ?", [req.params.id]);
  res.json(rows[0]);
};

export const createArtista = async (req, res) => {
  const { nombre, apellido, nombreArt, dni, fechaNac, disponible } = req.body;
  const [result] = await pool.query(
    "INSERT INTO artistas (nombre, apellido, nombreArt, dni, fechaNac, disponible) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, apellido, nombreArt, dni, fechaNac, disponible]
  );
  res.status(201).json({ id: result.insertId, ...req.body });
};

export const updateArtista = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, nombreArt, dni, fechaNac, disponible } = req.body;
  const fechaFormateada = fechaNac ? fechaNac.split("T")[0] : null;
  await pool.query(
    "UPDATE artistas SET nombre=?, apellido=?, nombreArt=?, dni=?, fechaNac=?, disponible=? WHERE id=?",
    [nombre, apellido, nombreArt, dni, fechaFormateada, disponible, id]
  );
  res.json({ message: "Artista actualizado" });
};

export const deleteArtista = async (req, res) => {
  await pool.query("DELETE FROM artistas WHERE id = ?", [req.params.id]);
  res.json({ message: "Artista eliminado" });
};
