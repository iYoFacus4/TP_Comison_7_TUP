import pool from "../db/db.js";

// GET /api/appointments - Listar todas las citas
export const getAllAppointments = async (req, res) => {
  try {
    const { status, date, client_id, service_id } = req.query;
    let query = `
      SELECT 
        a.*,
        c.name as client_name,
        c.email as client_email,
        s.name as service_name,
        s.duration as service_duration,
        s.price as service_price
      FROM appointments a
      INNER JOIN clients c ON a.client_id = c.id
      INNER JOIN services s ON a.service_id = s.id
      WHERE 1=1
    `;
    const params = [];

    // Filtros opcionales
    if (status) {
      query += " AND a.status = ?";
      params.push(status);
    }

    if (date) {
      query += " AND a.date = ?";
      params.push(date);
    }

    if (client_id) {
      query += " AND a.client_id = ?";
      params.push(client_id);
    }

    if (service_id) {
      query += " AND a.service_id = ?";
      params.push(service_id);
    }

    query += " ORDER BY a.date DESC, a.time DESC";

    const [appointments] = await pool.query(query, params);
    res.json({
      ok: true,
      data: appointments,
      total: appointments.length,
    });
  } catch (error) {
    console.error("Error al obtener citas:", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener la lista de citas",
    });
  }
};

// GET /api/appointments/:id - Obtener una cita por ID
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [appointments] = await pool.query(
      `
      SELECT 
        a.*,
        c.name as client_name,
        c.email as client_email,
        c.phone as client_phone,
        s.name as service_name,
        s.description as service_description,
        s.duration as service_duration,
        s.price as service_price
      FROM appointments a
      INNER JOIN clients c ON a.client_id = c.id
      INNER JOIN services s ON a.service_id = s.id
      WHERE a.id = ?
    `,
      [id]
    );

    if (appointments.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Cita no encontrada",
      });
    }

    res.json({
      ok: true,
      data: appointments[0],
    });
  } catch (error) {
    console.error("Error al obtener cita:", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener la cita",
    });
  }
};

// POST /api/appointments - Crear una nueva cita
export const createAppointment = async (req, res) => {
  try {
    const { client_id, service_id, date, time, status } = req.body;

    // Validaciones básicas
    if (!client_id || !service_id || !date || !time) {
      return res.status(400).json({
        ok: false,
        error:
          "Los campos 'client_id', 'service_id', 'date' y 'time' son obligatorios",
      });
    }

    // Validar formato de fecha (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        ok: false,
        error: "El formato de fecha debe ser YYYY-MM-DD",
      });
    }

    // Validar formato de hora (HH:MM:SS o HH:MM)
    const timeRegex = /^\d{2}:\d{2}(:\d{2})?$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({
        ok: false,
        error: "El formato de hora debe ser HH:MM:SS o HH:MM",
      });
    }

    // Verificar que el cliente existe
    const [client] = await pool.query("SELECT id FROM clients WHERE id = ?", [
      client_id,
    ]);
    if (client.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "El cliente especificado no existe",
      });
    }

    // Verificar que el servicio existe y está disponible
    const [service] = await pool.query(
      "SELECT id, available FROM services WHERE id = ?",
      [service_id]
    );
    if (service.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "El servicio especificado no existe",
      });
    }
    if (!service[0].available) {
      return res.status(400).json({
        ok: false,
        error: "El servicio seleccionado no está disponible",
      });
    }

    // Verificar que no haya otra cita en el mismo horario
    const [existingAppointment] = await pool.query(
      "SELECT id FROM appointments WHERE date = ? AND time = ? AND status != 'cancelado'",
      [date, time]
    );
    if (existingAppointment.length > 0) {
      return res.status(409).json({
        ok: false,
        error: "Ya existe una cita agendada para esa fecha y hora",
      });
    }

    const appointmentStatus = status || "pendiente";
    const validStatuses = [
      "pendiente",
      "confirmado",
      "completado",
      "cancelado",
    ];
    if (!validStatuses.includes(appointmentStatus)) {
      return res.status(400).json({
        ok: false,
        error: `El estado debe ser uno de: ${validStatuses.join(", ")}`,
      });
    }

    const [result] = await pool.query(
      "INSERT INTO appointments (client_id, service_id, date, time, status) VALUES (?, ?, ?, ?, ?)",
      [client_id, service_id, date, time, appointmentStatus]
    );

    res.status(201).json({
      ok: true,
      message: "Cita creada exitosamente",
      data: {
        id: result.insertId,
        client_id,
        service_id,
        date,
        time,
        status: appointmentStatus,
      },
    });
  } catch (error) {
    console.error("Error al crear cita:", error);
    res.status(500).json({
      ok: false,
      error: "Error al crear la cita",
    });
  }
};

// PUT /api/appointments/:id - Actualizar una cita
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, service_id, date, time, status } = req.body;

    // Validaciones básicas
    if (!client_id || !service_id || !date || !time) {
      return res.status(400).json({
        ok: false,
        error:
          "Los campos 'client_id', 'service_id', 'date' y 'time' son obligatorios",
      });
    }

    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        ok: false,
        error: "El formato de fecha debe ser YYYY-MM-DD",
      });
    }

    // Validar formato de hora
    const timeRegex = /^\d{2}:\d{2}(:\d{2})?$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({
        ok: false,
        error: "El formato de hora debe ser HH:MM:SS o HH:MM",
      });
    }

    // Verificar que la cita existe
    const [existingAppointment] = await pool.query(
      "SELECT id FROM appointments WHERE id = ?",
      [id]
    );
    if (existingAppointment.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Cita no encontrada",
      });
    }

    // Verificar que el cliente existe
    const [client] = await pool.query("SELECT id FROM clients WHERE id = ?", [
      client_id,
    ]);
    if (client.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "El cliente especificado no existe",
      });
    }

    // Verificar que el servicio existe
    const [service] = await pool.query("SELECT id FROM services WHERE id = ?", [
      service_id,
    ]);
    if (service.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "El servicio especificado no existe",
      });
    }

    // Verificar conflictos de horario (excluyendo la cita actual)
    const [conflictingAppointment] = await pool.query(
      "SELECT id FROM appointments WHERE date = ? AND time = ? AND id != ? AND status != 'cancelado'",
      [date, time, id]
    );
    if (conflictingAppointment.length > 0) {
      return res.status(409).json({
        ok: false,
        error: "Ya existe otra cita agendada para esa fecha y hora",
      });
    }

    const appointmentStatus = status || "pendiente";
    const validStatuses = [
      "pendiente",
      "confirmado",
      "completado",
      "cancelado",
    ];
    if (!validStatuses.includes(appointmentStatus)) {
      return res.status(400).json({
        ok: false,
        error: `El estado debe ser uno de: ${validStatuses.join(", ")}`,
      });
    }

    await pool.query(
      "UPDATE appointments SET client_id = ?, service_id = ?, date = ?, time = ?, status = ? WHERE id = ?",
      [client_id, service_id, date, time, appointmentStatus, id]
    );

    res.json({
      ok: true,
      message: "Cita actualizada exitosamente",
      data: {
        id: parseInt(id),
        client_id,
        service_id,
        date,
        time,
        status: appointmentStatus,
      },
    });
  } catch (error) {
    console.error("Error al actualizar cita:", error);
    res.status(500).json({
      ok: false,
      error: "Error al actualizar la cita",
    });
  }
};

// DELETE /api/appointments/:id - Eliminar una cita
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si la cita existe
    const [existingAppointment] = await pool.query(
      "SELECT id FROM appointments WHERE id = ?",
      [id]
    );

    if (existingAppointment.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Cita no encontrada",
      });
    }

    await pool.query("DELETE FROM appointments WHERE id = ?", [id]);

    res.json({
      ok: true,
      message: "Cita eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar cita:", error);
    res.status(500).json({
      ok: false,
      error: "Error al eliminar la cita",
    });
  }
};

// PATCH /api/appointments/:id/status - Actualizar solo el estado de una cita
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        ok: false,
        error: "El campo 'status' es obligatorio",
      });
    }

    const validStatuses = [
      "pendiente",
      "confirmado",
      "completado",
      "cancelado",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        ok: false,
        error: `El estado debe ser uno de: ${validStatuses.join(", ")}`,
      });
    }

    // Verificar que la cita existe
    const [existingAppointment] = await pool.query(
      "SELECT id FROM appointments WHERE id = ?",
      [id]
    );

    if (existingAppointment.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "Cita no encontrada",
      });
    }

    await pool.query("UPDATE appointments SET status = ? WHERE id = ?", [
      status,
      id,
    ]);

    res.json({
      ok: true,
      message: "Estado de la cita actualizado exitosamente",
      data: {
        id: parseInt(id),
        status,
      },
    });
  } catch (error) {
    console.error("Error al actualizar estado de cita:", error);
    res.status(500).json({
      ok: false,
      error: "Error al actualizar el estado de la cita",
    });
  }
};
