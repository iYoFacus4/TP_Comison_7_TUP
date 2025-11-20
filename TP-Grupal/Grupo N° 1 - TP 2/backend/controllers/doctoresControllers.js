import { pool } from "../config/db.js";

export const obtenerDoctores = async (req, res) => {
    try {
        const [rows] = await pool.query(`   
        SELECT 
        d.id,
        d.titulo,
        d.nombre,
        d.apellido,
        d.telefono,
        d.email,
        d.especialidad_id,
        e.nombre AS especialidad
      FROM doctores d
      LEFT JOIN especialidades e ON d.especialidad_id = e.id`);
        res.json({
        success: true,
        data: rows,
        total: rows.length,});
    } catch (error) {
        console.error("Error al obtener el Doctor", error);
        res.status(500).json({success: false, error: "Error del servidor" })
    }
}


export const agregarDoctores = async (req, res) => {
    try {
        const { titulo, nombre, apellido, especialidad_id, telefono, email } = req.body

        if (!titulo || !nombre || !apellido || !especialidad_id || !telefono || !email) {
            return res.status(400).json({ error: "Faltan Datos" })
        }
        const [result] = await pool.query("INSERT INTO doctores (titulo, nombre, apellido, especialidad_id, telefono, email) VALUE (?, ?, ?, ?, ?, ?)", [titulo, nombre, apellido, especialidad_id, telefono, email])
        res.status(201).json({ id: result.insertId, nombre })
    } catch (error) {
        res.status(500).json({ error: "Error del Servidor" })
    }
}

export const modificarDoctores = async (req, res) => {
    try {
        const { id } = req.params
        const { titulo, nombre, apellido, especialidad_id, telefono, email } = req.body

        const [result] = await pool.query("UPDATE doctores SET titulo= ?, nombre= ?, apellido= ?, especialidad_id= ?, telefono= ?, email= ? WHERE id= ?",
            [titulo, nombre, apellido, especialidad_id, telefono, email, id])

        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Doctor No Encontrado" })
        }
        res.json({ message: "Doctor Actualizado Correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error del Servidor" })
    }
}

export const eliminarDcotores = async (req, res) => {
    try{
    const {id} = req.params 
    const [result] = await pool.query("DELETE FROM doctores WHERE id= ?", [id])
    if(result.affectedRows === 0) {
        res.status(400).json({message: "Doctor no encontrado"})
    } 
    res.json({message: "Doctor Eliminado Correctamente"})
} catch(error) {
    res.status(500).json({error: "Error Del Servidor"})
}
}

export const obtenerPorEspecialidad = async (req, res) => {
  try {
    const { especialidad } = req.params; 

    const [rows] = await pool.query(
      `
      SELECT 
        d.id,
        d.nombre,
        d.titulo,
        d.apellido,
        d.email,
        d.telefono,
        e.nombre AS especialidad
      FROM doctores d
      JOIN especialidades e ON d.especialidad_id = e.id
      WHERE e.nombre = ?
      `,
      [especialidad]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "No se encontraron doctores con esa especialidad" });
    }

    res.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error) {
    console.error("Error al obtener doctores por especialidad:", error);
    res.status(500).json({ success: false, error: "Error del servidor" });
  }
};
