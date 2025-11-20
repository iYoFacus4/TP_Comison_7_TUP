import { pool } from "../config/db.js";

export const obtenerEspecialidades = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT nombre FROM especialidades");
        res.json({
        success: true,
        data: rows,
        total: rows.length,});
    } catch (error) {
        console.error("Error al obtener el Doctor", error);
        res.status(500).json({success: false, error: "Error del servidor" })
    }
}
