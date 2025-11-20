// backend/Controllers/cuotasController.js (VERSIÓN FINAL Y COMPLETA EN MYSQL)
import pool from '../config/db.js';

const cuotasController = {

    /**
     * @description Obtiene todas las cuotas de todos los socios.
     * @route GET /api/cuotas
     */
    getAllCuotas: async (req, res) => {
        try {
            // Se añaden los alias 'miembro' y 'cuota' para que el frontend los pueda leer
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
            const sql = `
                SELECT c.*, s.nombre as miembro, c.monto as cuota 
                FROM cuotas c
                JOIN socios s ON c.socio_id = s.id
                WHERE c.socio_id = ? 
                ORDER BY c.fecha_vencimiento DESC;
            `;
            
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
     * @description Crea una nueva cuota para un socio (usado internamente o por frontend).
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
            
            const [result] = await pool.query(sql, [socio_id, monto, membresia, fecha_vencimiento, estadoFinal]);
            
            res.status(201).json({
                message: 'Cuota creada exitosamente',
                id: result.insertId,
                ...req.body,
                estado: estadoFinal
            });
        } catch (err) {
             if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                 return res.status(404).json({ error: 'El socio_id no existe.' });
            }
            console.error('Error al crear cuota:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    
    /**
     * @description ¡NUEVA FUNCIÓN! Registra una o más cuotas buscando al socio por DNI.
     * @route POST /api/cuotas/registrar-pago
     */
    registerPaymentByDni: async (req, res) => {
        let connection;
        try {
            const { dni, monto, meses } = req.body; // Cantidad de meses a registrar
            
            if (!dni || !monto || !meses || meses < 1) {
                return res.status(400).json({ message: 'DNI, monto y cantidad de meses son requeridos.' });
            }

            // 1. Buscar el socio por DNI
            const [socioRows] = await pool.query('SELECT id, nombre FROM socios WHERE dni = ?', [dni]);
            if (socioRows.length === 0) {
                return res.status(404).json({ message: 'Socio no encontrado con ese DNI.' });
            }
            const socio = socioRows[0];

            // 2. Insertar una cuota por cada mes
            const cuotasValues = [];
            const today = new Date();
            
            for (let i = 0; i < meses; i++) {
                // Calcula la fecha de vencimiento (mes siguiente)
                const vencimiento = new Date();
                vencimiento.setMonth(today.getMonth() + i); 
                vencimiento.setDate(1); // Fija el día 1
                
                cuotasValues.push([
                    socio.id,
                    monto,
                    'Estándar', // Membresía
                    vencimiento.toISOString().slice(0, 10), // Formato YYYY-MM-DD
                    'Pagado' // Estado
                ]);
            }
            
            // 3. Insertar todas las cuotas en una sola transacción
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const sql = 'INSERT INTO cuotas (socio_id, monto, membresia, fecha_vencimiento, estado) VALUES ?';
            await connection.query(sql, [cuotasValues]);

            await connection.commit(); 
            connection.release();

            res.status(201).json({ 
                message: `Pago(s) por ${meses} mes(es) registrado(s) para el socio ${socio.nombre}.`,
                socioId: socio.id
            });

        } catch (err) {
            if (connection) await connection.rollback();
            if (connection) connection.release();
            console.error('Error al registrar pago por DNI:', err.message);
            res.status(500).json({ error: 'Error interno del servidor.' });
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

            if (result.affectedRows === 0) {
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

            if (result.affectedRows === 0) {
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