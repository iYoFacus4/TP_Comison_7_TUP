import { pool } from "../config/db.js";

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

//  Agregar un nuevo usuario
export const agregarUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const [result] = await pool.query(
      "INSERT INTO usuarios (email, contraseña) VALUES (?, ?)",
      [email, contraseña]
    );

    res.status(201).json({ id: result.insertId, email });
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};


export const modificarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, contraseña } = req.body;

    const [result] = await pool.query(
      "UPDATE usuarios SET email = ?, contraseña = ? WHERE id = ?",
      [email, contraseña, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al modificar usuario:", error);
    res.status(500).json({ message: "Error al modificar usuario" });
  }
};


export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

 export const obtenerUsuarioPorMail = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
      console.log("Headers:", req.headers);
  console.log("Body recibido:", req.body);
    console.log("LLEGA AQUI", email, contraseña);

    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
 
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const usuario = rows[0];
     if (String(usuario.contraseña) !== String(contraseña)) {
       return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    res.json({
      success: true,
      data: usuario,
    });

  } catch (error) {
  console.error("Error en obtenerPorMail:", error);
    res.status(500).json({ message: "Error al obtener usuario por mail XD" });
  }
};
