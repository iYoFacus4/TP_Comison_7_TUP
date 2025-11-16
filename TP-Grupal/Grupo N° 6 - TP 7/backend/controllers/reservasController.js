// Controlador de reservas con validación de cupo, duplicados y estado.
// Cumple con la consigna: no superar cupos, evitar duplicados, listar, crear y eliminar reservas.

const { query } = require('../config/db');

// Helpers internos
async function existeSocio(id) {
  const [rows] = await query('SELECT id FROM socios WHERE id = ?', [id]);
  return rows.length > 0;
}

async function existeActividad(id) {
  const [rows] = await query('SELECT id, cupo_maximo FROM actividades WHERE id = ?', [id]);
  return rows[0];
}

async function reservasDelDia(actividad_id, fecha) {
  const [rows] = await query(
    'SELECT COUNT(*) AS total FROM reservas WHERE actividad_id = ? AND fecha = ? AND estado = "activa"',
    [actividad_id, fecha]
  );
  return rows[0]?.total || 0;
}

async function yaReservo(socio_id, actividad_id, fecha) {
  const [rows] = await query(
    'SELECT id FROM reservas WHERE socio_id = ? AND actividad_id = ? AND fecha = ? AND estado = "activa" LIMIT 1',
    [socio_id, actividad_id, fecha]
  );
  return rows.length > 0;
}

// ======================= CRUD =======================

// GET /api/reservas
async function listar(req, res) {
  try {
    const { socio_id, actividad_id } = req.query;

    let sql = `
      SELECT r.id, r.fecha, r.estado,
             s.nombre AS socio_nombre, a.nombre AS actividad_nombre,
             r.socio_id, r.actividad_id
      FROM reservas r
      JOIN socios s ON r.socio_id = s.id
      JOIN actividades a ON r.actividad_id = a.id
      WHERE 1=1
    `;
    const params = [];
    if (socio_id) { sql += ' AND r.socio_id = ?'; params.push(socio_id); }
    if (actividad_id) { sql += ' AND r.actividad_id = ?'; params.push(actividad_id); }
    sql += ' ORDER BY r.fecha DESC';

    const [rows] = await query(sql, params);
    return res.json(rows);
  } catch (err) {
    console.error('Error al listar reservas:', err);
    return res.status(500).json({ message: 'Error al listar reservas' });
  }
}

// POST /api/reservas
async function crear(req, res) {
  try {
    const { socio_id, actividad_id, fecha } = req.body || {};

    if (!socio_id || !actividad_id || !fecha) {
      return res.status(400).json({ message: 'socio_id, actividad_id y fecha son obligatorios' });
    }

    if (!(await existeSocio(socio_id)))
      return res.status(404).json({ message: 'El socio no existe' });

    const actividad = await existeActividad(actividad_id);
    if (!actividad)
      return res.status(404).json({ message: 'La actividad no existe' });

    if (await yaReservo(socio_id, actividad_id, fecha))
      return res.status(409).json({ message: 'El socio ya tiene reserva para esa fecha' });

    const tomadas = await reservasDelDia(actividad_id, fecha);
    if (tomadas >= actividad.cupo_maximo)
      return res.status(409).json({ message: 'Cupo completo para esa actividad y fecha' });

    await query(
      'INSERT INTO reservas (socio_id, actividad_id, fecha, estado) VALUES (?, ?, ?, "activa")',
      [socio_id, actividad_id, fecha]
    );

    const [nueva] = await query(
      `SELECT r.id, r.socio_id, s.nombre AS socio_nombre,
              r.actividad_id, a.nombre AS actividad_nombre,
              r.fecha, r.estado
       FROM reservas r
       JOIN socios s ON r.socio_id = s.id
       JOIN actividades a ON r.actividad_id = a.id
       ORDER BY r.id DESC LIMIT 1`
    );

    return res.status(201).json(nueva[0]);
  } catch (err) {
    console.error('Error al crear reserva:', err);
    return res.status(500).json({ message: 'Error al crear reserva' });
  }
}

// PUT /api/reservas/:id
async function actualizar(req, res) {
  try {
    const { id } = req.params;
    const { fecha, estado } = req.body || {};

    const [rows] = await query('SELECT * FROM reservas WHERE id = ?', [id]);
    const reserva = rows[0];
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });

    // Validar cambio de fecha (duplicado/cupo)
    if (fecha && fecha !== reserva.fecha) {
      if (await yaReservo(reserva.socio_id, reserva.actividad_id, fecha))
        return res.status(409).json({ message: 'El socio ya tiene reserva para esa fecha' });

      const actividad = await existeActividad(reserva.actividad_id);
      const tomadas = await reservasDelDia(reserva.actividad_id, fecha);
      if (tomadas >= actividad.cupo_maximo)
        return res.status(409).json({ message: 'Cupo completo para esa fecha' });
    }

    // Validar estado
    const nuevoEstado = estado || reserva.estado;
    const permitidos = ['activa', 'cancelada', 'asistida'];
    if (!permitidos.includes(nuevoEstado))
      return res.status(400).json({ message: 'Estado inválido' });

    await query('UPDATE reservas SET fecha=?, estado=? WHERE id=?', [fecha || reserva.fecha, nuevoEstado, id]);

    const [final] = await query(
      `SELECT r.id, r.socio_id, s.nombre AS socio_nombre,
              r.actividad_id, a.nombre AS actividad_nombre,
              r.fecha, r.estado
       FROM reservas r
       JOIN socios s ON r.socio_id = s.id
       JOIN actividades a ON r.actividad_id = a.id
       WHERE r.id = ? LIMIT 1`,
      [id]
    );

    return res.json(final[0]);
  } catch (err) {
    console.error('Error al actualizar reserva:', err);
    return res.status(500).json({ message: 'Error al actualizar reserva' });
  }
}

// DELETE /api/reservas/:id
async function eliminar(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await query('SELECT id FROM reservas WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Reserva no encontrada' });

    // Soft delete (marca cancelada)
    await query('UPDATE reservas SET estado="cancelada" WHERE id=?', [id]);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Error al eliminar reserva:', err);
    return res.status(500).json({ message: 'Error al eliminar reserva' });
  }
}

module.exports = { listar, crear, actualizar, eliminar };
