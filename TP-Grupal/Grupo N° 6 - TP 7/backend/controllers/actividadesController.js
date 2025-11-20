// CRUD Actividades (snake_case -> camelCase)
const { query } = require('../config/db');

function mapActRow(r) {
  return {
    id: r.id,
    nombre: r.nombre,
    cupoMaximo: r.cupo_maximo,
    inscritos: r.inscritos,
    horario: r.horario,
    dias: r.dias,
    instructor: r.instructor,
  };
}

async function list(req, res) {
  const [actividades] = await query('SELECT * FROM actividades ORDER BY id DESC');

  // Obtener cantidad de inscritos por actividad
  const [inscritosRows] = await query(`
    SELECT actividad_id, COUNT(*) AS inscritos
    FROM reservas
    WHERE estado = "activa"
    GROUP BY actividad_id
  `);

  // Convertir en un mapa rápido actividad → inscritos
  const inscritosMap = {};
  for (const row of inscritosRows) {
    inscritosMap[row.actividad_id] = row.inscritos;
  }

  // Combinar actividades + inscritos reales
  const resultado = actividades.map(a => ({
    id: a.id,
    nombre: a.nombre,
    cupoMaximo: a.cupo_maximo,
    horario: a.horario,
    dias: a.dias,
    instructor: a.instructor,
    inscritos: inscritosMap[a.id] || 0, // si no hay inscriptos, va 0
  }));

  return res.json(resultado);
}

async function getById(req, res) {
  const id = Number(req.params.id);
  const [rows] = await query('SELECT * FROM actividades WHERE id = ?', [id]);
  if (!rows.length) return res.status(404).json({ message: 'Actividad no encontrada' });
  return res.json(mapActRow(rows[0]));
}

async function create(req, res) {
  const { nombre, cupoMaximo, inscritos, horario, dias, instructor } = req.body || {};
  if (!nombre || !cupoMaximo) return res.status(400).json({ message: 'nombre y cupoMaximo son requeridos' });

  await query(
    `INSERT INTO actividades (nombre, cupo_maximo, inscritos, horario, dias, instructor)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, Number(cupoMaximo), Number(inscritos || 0), horario || null, dias || null, instructor || null]
  );

  const [rows] = await query('SELECT * FROM actividades ORDER BY id DESC LIMIT 1');
  return res.status(201).json(mapActRow(rows[0]));
}

async function update(req, res) {
  const id = Number(req.params.id);
  const { nombre, cupoMaximo, inscritos, horario, dias, instructor } = req.body || {};

  const [exist] = await query('SELECT id FROM actividades WHERE id = ?', [id]);
  if (!exist.length) return res.status(404).json({ message: 'Actividad no encontrada' });

  await query(
    `UPDATE actividades SET nombre = ?, cupo_maximo = ?, inscritos = ?, horario = ?, dias = ?, instructor = ?
     WHERE id = ?`,
    [nombre, Number(cupoMaximo), Number(inscritos), horario, dias, instructor, id]
  );

  const [rows] = await query('SELECT * FROM actividades WHERE id = ?', [id]);
  return res.json(mapActRow(rows[0]));
}

async function remove(req, res) {
  const id = Number(req.params.id);
  const [exist] = await query('SELECT id FROM actividades WHERE id = ?', [id]);
  if (!exist.length) return res.status(404).json({ message: 'Actividad no encontrada' });

  await query('DELETE FROM actividades WHERE id = ?', [id]);
  return res.json({ ok: true });
}

// Lista actividades + cupos ocupados (reservas del día)
async function listConCupos(req, res) {
  const [rows] = await query(`
    SELECT a.id, a.nombre, a.cupo_maximo, a.horario, a.dias, a.instructor,
      (
        SELECT COUNT(*)
        FROM reservas r
        WHERE r.actividad_id = a.id
          AND r.estado = 'activa'
          AND r.fecha = CURDATE()
      ) AS cupos_ocupados
    FROM actividades a
    ORDER BY a.id DESC
  `);

  const data = rows.map(r => {
    const inscritos = r.cupos_ocupados || 0;
    const disponibles = r.cupo_maximo - inscritos;
    const porcentaje = r.cupo_maximo > 0
      ? Math.round((inscritos / r.cupo_maximo) * 100)
      : 0;

    return {
      id: r.id,
      nombre: r.nombre,
      cupoMaximo: r.cupo_maximo,
      horario: r.horario,
      dias: r.dias,
      instructor: r.instructor,
      inscritos,
      disponibles,
      porcentaje
    };
  });

  return res.json(data);
}


module.exports = { list, getById, create, update, remove, listConCupos };
