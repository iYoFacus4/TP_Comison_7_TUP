// backend/Controllers/dashboardController.js (VERSIÓN MYSQL)
import pool from '../config/db.js'; // <-- 1. Importamos 'pool'

const dashboardController = {
  /**
   * @description Obtiene todas las estadísticas para el Dashboard.
   * @route GET /api/dashboard/stats
   */
  getDashboardStats: async (req, res) => {
    try {
      // 2. Usamos pool.query() para todas las consultas

      // 1. Contar total de socios
      const [sociosResult] = await pool.query('SELECT COUNT(id) as totalSocios FROM socios;');
      
      // 2. Contar total de deportes
      const [deportesResult] = await pool.query('SELECT COUNT(id) as totalDeportes FROM deportes;');
      
      // 3. Contar pagos del mes (asumiendo que "del mes" es 'Pagado')
      const [pagosResult] = await pool.query("SELECT COUNT(id) as pagosDelMes FROM cuotas WHERE estado = 'Pagado';");
      
      // 4. Sumar deuda pendiente
      const [deudaResult] = await pool.query("SELECT SUM(monto) as deudaPendiente FROM cuotas WHERE estado = 'Pendiente' OR estado = 'Vencido';");
      
      // 5. Unimos todos los resultados
      // (La sintaxis de [0] es porque pool.query devuelve un array de filas)
      const stats = {
        totalSocios: sociosResult[0].totalSocios || 0,
        totalDeportes: deportesResult[0].totalDeportes || 0,
        pagosDelMes: pagosResult[0].pagosDelMes || 0,
        deudaPendiente: deudaResult[0].deudaPendiente || 0
      };

      res.status(200).json(stats);

    } catch (err) {
      console.error('Error al obtener estadísticas del dashboard:', err.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

export default dashboardController;