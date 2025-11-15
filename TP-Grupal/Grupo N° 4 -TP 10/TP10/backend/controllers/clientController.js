import pool from "../db/db.js";

// GET /api/clients - Listar todos los clientes
export const getAllClients = async (req, res) => {
  try {
    const [clients] = await pool.query(
      "SELECT * FROM clients ORDER BY fecha_registro DESC"
    );
    res.json({
      ok: true,
      data: clients,
      total: clients.length,
    });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener la lista de clientes",
    });
  }
};

// GET /api/clients/:id - Obtener un cliente por ID
export const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const [clients] = await pool.query("SELECT * FROM clients WHERE id = ?", [
      id,
    ]);

    if (clients.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Cliente no encontrado",
      });
    }

    res.json({
      ok: true,
      data: clients[0],
    });
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener el cliente",
    });
  }
};

// POST /api/clients - Crear un nuevo cliente
export const createClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validaciones básicas
    if (!name || !email) {
      return res.status(400).json({
        ok: false,
        error: "Los campos 'name' y 'email' son obligatorios",
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: "El formato del email no es válido",
      });
    }

    // Verificar si el email ya existe
    const [existingClient] = await pool.query(
      "SELECT id FROM clients WHERE email = ?",
      [email]
    );

    if (existingClient.length > 0) {
      return res.status(409).json({
        ok: false,
        error: "Ya existe un cliente con ese email",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone || null]
    );

    res.status(201).json({
      ok: true,
      message: "Cliente creado exitosamente",
      data: {
        id: result.insertId,
        name,
        email,
        phone,
      },
    });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({
      ok: false,
      error: "Error al crear el cliente",
    });
  }
};

// PUT /api/clients/:id - Actualizar un cliente
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    // Validaciones básicas
    if (!name || !email) {
      return res.status(400).json({
        ok: false,
        error: "Los campos 'name' y 'email' son obligatorios",
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: "El formato del email no es válido",
      });
    }

    // Verificar si el cliente existe
    const [existingClient] = await pool.query(
      "SELECT id FROM clients WHERE id = ?",
      [id]
    );

    if (existingClient.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Cliente no encontrado",
      });
    }

    // Verificar si el email ya está en uso por otro cliente
    const [emailInUse] = await pool.query(
      "SELECT id FROM clients WHERE email = ? AND id != ?",
      [email, id]
    );

    if (emailInUse.length > 0) {
      return res.status(409).json({
        ok: false,
        error: "El email ya está en uso por otro cliente",
      });
    }

    await pool.query(
      "UPDATE clients SET name = ?, email = ?, phone = ? WHERE id = ?",
      [name, email, phone || null, id]
    );

    res.json({
      ok: true,
      message: "Cliente actualizado exitosamente",
      data: {
        id: parseInt(id),
        name,
        email,
        phone,
      },
    });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({
      ok: false,
      error: "Error al actualizar el cliente",
    });
  }
};

// DELETE /api/clients/:id - Eliminar un cliente
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el cliente existe
    const [existingClient] = await pool.query(
      "SELECT id FROM clients WHERE id = ?",
      [id]
    );

    if (existingClient.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Cliente no encontrado",
      });
    }

    // Verificar si el cliente tiene citas asociadas
    const [appointments] = await pool.query(
      "SELECT COUNT(*) as count FROM appointments WHERE client_id = ?",
      [id]
    );

    if (appointments[0].count > 0) {
      return res.status(409).json({
        ok: false,
        error: `No se puede eliminar el cliente porque tiene ${appointments[0].count} cita(s) asociada(s)`,
      });
    }

    await pool.query("DELETE FROM clients WHERE id = ?", [id]);

    res.json({
      ok: true,
      message: "Cliente eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({
      ok: false,
      error: "Error al eliminar el cliente",
    });
  }
};
