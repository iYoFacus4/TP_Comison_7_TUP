const { query } = require('../config/db');

async function actividadesConCupos(req, res) {
  try {
    const [actividades] = await query("SELECT * FROM actividades ORDER BY id DESC");

    const actividadesConInfo = await Promise.all(
      actividades.map(async (act) => {
        const [inscritos] = await query(
          `SELECT COUNT(*) AS total
           FROM reservas 
           WHERE actividad_id = ? AND estado = 'activa'`,
          [act.id]
        );

        const totalInscritos = inscritos[0].total;
        const disponibles = act.cupo_maximo - totalInscritos;
        const porcentaje = Math.round((totalInscritos / act.cupo_maximo) * 100);

        return {
          id: act.id,
          nombre: act.nombre,
          instructor: act.instructor,
          horario: act.horario,
          dias: act.dias,
          cupoMaximo: act.cupo_maximo,
          inscritos: totalInscritos,
          disponibles,
          porcentaje,
        };
      })
    );

    return res.json(actividadesConInfo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error al obtener actividades con cupos" });
  }
}

module.exports = { actividadesConCupos };
