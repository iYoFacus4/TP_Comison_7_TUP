import { pool } from "../config/db.js";

// Obtener todos los usuarios
export const obtenerPacientes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pacientes");
    res.json({
      success: true,
      data: rows,
    });  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

//  Agregar un nuevo usuario
export const agregarPaciente = async (req, res) => {
  try {
    const { nombre, apellido, dni, fecha_nacimiento, telefono, direccion, email } = req.body;

    if ( !nombre || !apellido || !dni || !fecha_nacimiento || !telefono || !direccion || !email ) {
      return res.status(400).json({
      success: false, error: "Faltan datos" });
    }

    const [result] = await pool.query(
      "INSERT INTO pacientes (nombre, apellido, dni, fecha_nacimiento, telefono, direccion, email ) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellido, dni, fecha_nacimiento, telefono, direccion, email]
    );

     res.json({
      success: true,
      data: {id: result.insertId, nombre: nombre, apellido: apellido, dni: dni, fecha_nacimiento: fecha_nacimiento, telefono: telefono, direccion: direccion, email: email},
    }); 
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).json({
      success: false,error: "Error del servidor" });
  }
};


export const modificarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const {nombre, apellido, dni, fecha_nacimiento, telefono,direccion , email } = req.body;

    const [result] = await pool.query(
      "UPDATE pacientes SET nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, telefono = ?, direccion = ?, email = ? WHERE id = ?",
      [nombre,apellido, dni, fecha_nacimiento, telefono, direccion, email ,id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

     res.json({
      success: true,
      data: {id: id, nombre: nombre, apellido: apellido, dni: dni, fecha_nacimiento: fecha_nacimiento, telefono: telefono, direccion: direccion , email: email }});   } catch (error) {
    console.error("Error al modificar Paciente:", error);
    res.status(500).json({ message: "Error al modificar Paciente" });
  }
};


export const eliminarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query("DELETE FROM citas WHERE paciente_id = ?", [id]);
 
    const [result] = await pool.query("DELETE FROM pacientes WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    res.json({success:true, data: result,  message: "Paciente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    res.status(500).json({ message: "Error al eliminar paciente" });
  }
};

 export const obtenerPacientePorMail = async (req, res) => {
  try {
    const { email } = req.body;
      console.log("Headers:", req.headers);
  console.log("Body recibido:", req.body);

    const [rows] = await pool.query(
      "SELECT * FROM pacientes WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Paciente no encontrado",
      });
    }
    res.json({
      success: true,
      data: rows,
    });

  } catch (error) {
  console.error("Error en obtenerPorMail:", error);
    res.status(500).json({ message: "Error al obtener paciente por mail XD" });
  }
};

