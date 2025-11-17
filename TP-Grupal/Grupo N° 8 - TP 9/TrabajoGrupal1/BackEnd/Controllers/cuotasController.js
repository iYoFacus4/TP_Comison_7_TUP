// backend/Controllers/cuotasController.js (VERSIÓN MYSQL)
import pool from '../config/db.js'; // <-- 1. Importamos 'pool'

const cuotasController = {

    /**
     * @description Obtiene todas las cuotas de todos los socios.
     * @route GET /api/cuotas
     */
    getAllCuotas: async (req, res) => {
        try {
            // 2. Consulta SQL con alias (sin cambios)
            const sql = `
                SELECT 
                    c.*, 
                    s.nombre as miembro, 
                    s.dni as socio_dni,
                    c.monto as cuota 
                FROM cuotas c
                JOIN socios s ON c.socio_id = s.id
                ORDER BY c.fecha_vencimiento DESC;
            `;
            // 3. Usamos la sintaxis de pool.query()
            const [rows] = await pool.query(sql);
            res.status(200).json(rows);
        } catch (err) {
            console.error('Error al obtener cuotas:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    /**
     * @description Obtiene todas las cuotas de un socio específico.
     * @route GET /api/socios/:id/cuotas
     */
    getCuotasBySocioId: async (req, res) => {
        try {
            const { id: socio_id } = req.params; 
            const sql = 'SELECT * FROM cuotas WHERE socio_id = ? ORDER BY fecha_vencimiento DESC;';
            
            const [rows] = await pool.query(sql, [socio_id]);
            
            if (rows.length === 0) {
                return res.status(200).json([]);
            }
            res.status(200).json(rows);
        } catch (err) {
            console.error('Error al obtener cuotas del socio:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    /**
     * @description Crea una nueva cuota para un socio.
     * @route POST /api/cuotas
     */
    createCuota: async (req, res) => {
        try {
            const { socio_id, monto, membresia, fecha_vencimiento, estado } = req.body;

            if (!socio_id || !monto || !fecha_vencimiento) {
                return res.status(400).json({ message: 'socio_id, monto y fecha_vencimiento son requeridos' });
            }
            
            const estadoFinal = estado || 'Pendiente';

            const sql = 'INSERT INTO cuotas (socio_id, monto, membresia, fecha_vencimiento, estado) VALUES (?, ?, ?, ?, ?);';
            
            // 4. Usamos pool.query() para INSERT
            const [result] = await pool.query(sql, [socio_id, monto, membresia, fecha_vencimiento, estadoFinal]);
            
            res.status(201).json({
                message: 'Cuota creada exitosamente',
                id: result.insertId, // <-- 5. Usamos 'insertId'
                ...req.body,
                estado: estadoFinal
            });
        } catch (err) {
             // 6. Código de error de MySQL
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                 return res.status(404).json({ error: 'El socio_id no existe.' });
            }
            console.error('Error al crear cuota:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    /**
     * @description Actualiza el estado de una cuota (ej. marcar como 'Pagado').
     * @route PUT /api/cuotas/:id
     */
    updateCuotaEstado: async (req, res) => {
        try {
            const { id } = req.params;
            const { estado } = req.body; 

            if (!estado) {
                return res.status(400).json({ message: 'El campo "estado" es requerido' });
            }
            
            const estadosPermitidos = ['Pagado', 'Pendiente', 'Vencido'];
            if (!estadosPermitidos.includes(estado)) {
                 return res.status(400).json({ message: "El estado debe ser 'Pagado', 'Pendiente' o 'Vencido'" });
            }

            const sql = 'UPDATE cuotas SET estado = ? WHERE id = ?;';
            
            const [result] = await pool.query(sql, [estado, id]);

            if (result.affectedRows === 0) { // <-- 7. Usamos 'affectedRows'
                return res.status(404).json({ message: 'Cuota no encontrada' });
            }
            res.status(200).json({ message: `Cuota marcada como ${estado}` });
        } catch (err) {
            console.error('Error al actualizar cuota:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    /**
     * @description Elimina una cuota por su ID.
     * @route DELETE /api/cuotas/:id
     */
    deleteCuota: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = 'DELETE FROM cuotas WHERE id = ?;';
            
            const [result] = await pool.query(sql, [id]);

            if (result.affectedRows === 0) { // <-- 8. Usamos 'affectedRows'
                return res.status(404).json({ message: 'Cuota no encontrada' });
            }
            res.status(200).json({ message: 'Cuota eliminada exitosamente' });
        } catch (err) {
            console.error('Error al eliminar cuota:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export default cuotasController;