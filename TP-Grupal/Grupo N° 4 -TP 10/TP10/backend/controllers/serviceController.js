import pool from "../db/db.js";

// GET /api/services - Listar todos los servicios
export const getAllServices = async (req, res) => {
  try {
    const { available } = req.query;
    let query = "SELECT * FROM services";
    const params = [];

    // Filtrar por disponibilidad si se especifica
    if (available !== undefined) {
      query += " WHERE available = ?";
      params.push(available === "true" ? 1 : 0);
    }

    query += " ORDER BY fecha_creacion DESC";

    const [services] = await pool.query(query, params);
    res.json({
      ok: true,
      data: services,
      total: services.length,
    });
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener la lista de servicios",
    });
  }
};

// GET /api/services/:id - Obtener un servicio por ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const [services] = await pool.query("SELECT * FROM services WHERE id = ?", [
      id,
    ]);

    if (services.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Servicio no encontrado",
      });
    }

    res.json({
      ok: true,
      data: services[0],
    });
  } catch (error) {
    console.error("Error al obtener servicio:", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener el servicio",
    });
  }
};

// POST /api/services - Crear un nuevo servicio
export const createService = async (req, res) => {
  try {
    const { name, description, duration, price, available } = req.body;

    // Validaciones básicas
    if (!name || !duration || !price) {
      return res.status(400).json({
        ok: false,
        error: "Los campos 'name', 'duration' y 'price' son obligatorios",
      });
    }

    // Validar que duration sea un número positivo
    if (isNaN(duration) || duration <= 0) {
      return res.status(400).json({
        ok: false,
        error: "La duración debe ser un número positivo (en minutos)",
      });
    }

    // Validar que price sea un número positivo
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        ok: false,
        error: "El precio debe ser un número positivo",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO services (name, description, duration, price, available) VALUES (?, ?, ?, ?, ?)",
      [
        name,
        description || null,
        duration,
        price,
        available !== undefined ? available : true,
      ]
    );

    res.status(201).json({
      ok: true,
      message: "Servicio creado exitosamente",
      data: {
        id: result.insertId,
        name,
        description,
        duration,
        price,
        available: available !== undefined ? available : true,
      },
    });
  } catch (error) {
    console.error("Error al crear servicio:", error);
    res.status(500).json({
      ok: false,
      error: "Error al crear el servicio",
    });
  }
};

// PUT /api/services/:id - Actualizar un servicio
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, duration, price, available } = req.body;

    // Validaciones básicas
    if (!name || !duration || !price) {
      return res.status(400).json({
        ok: false,
        error: "Los campos 'name', 'duration' y 'price' son obligatorios",
      });
    }

    // Validar que duration sea un número positivo
    if (isNaN(duration) || duration <= 0) {
      return res.status(400).json({
        ok: false,
        error: "La duración debe ser un número positivo (en minutos)",
      });
    }

    // Validar que price sea un número positivo
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        ok: false,
        error: "El precio debe ser un número positivo",
      });
    }

    // Verificar si el servicio existe
    const [existingService] = await pool.query(
      "SELECT id FROM services WHERE id = ?",
      [id]
    );

    if (existingService.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Servicio no encontrado",
      });
    }

    await pool.query(
      "UPDATE services SET name = ?, description = ?, duration = ?, price = ?, available = ? WHERE id = ?",
      [
        name,
        description || null,
        duration,
        price,
        available !== undefined ? available : true,
        id,
      ]
    );

    res.json({
      ok: true,
      message: "Servicio actualizado exitosamente",
      data: {
        id: parseInt(id),
        name,
        description,
        duration,
        price,
        available,
      },
    });
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    res.status(500).json({
      ok: false,
      error: "Error al actualizar el servicio",
    });
  }
};

// DELETE /api/services/:id - Eliminar un servicio
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el servicio existe
    const [existingService] = await pool.query(
      "SELECT id FROM services WHERE id = ?",
      [id]
    );

    if (existingService.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Servicio no encontrado",
      });
    }

    // Verificar si el servicio tiene citas asociadas
    const [appointments] = await pool.query(
      "SELECT COUNT(*) as count FROM appointments WHERE service_id = ?",
      [id]
    );

    if (appointments[0].count > 0) {
      return res.status(409).json({
        ok: false,
        error: `No se puede eliminar el servicio porque tiene ${appointments[0].count} cita(s) asociada(s)`,
      });
    }

    await pool.query("DELETE FROM services WHERE id = ?", [id]);

    res.json({
      ok: true,
      message: "Servicio eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    res.status(500).json({
      ok: false,
      error: "Error al eliminar el servicio",
    });
  }
};
