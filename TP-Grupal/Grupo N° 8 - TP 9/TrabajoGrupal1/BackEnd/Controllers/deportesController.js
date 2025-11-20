// backend/Controllers/deportesController.js
import pool from '../config/db.js'; // <-- 1. Importamos 'pool'

const deportesController = {

    /**
     * @description Obtiene todos los deportes (con filtro opcional por estado).
     * @route GET /api/deportes
     * * @modifies SQL: Agrega LEFT JOIN y COUNT para calcular 'miembros'.
     */
    
    getAllDeportes: async (req, res) => {
        try {
            const { estado } = req.query; 

            // 1. Consulta SQL con JOIN y COUNT
            let sql = `
                SELECT 
                    d.*, 
                    COUNT(sd.socio_id) AS miembros 
                FROM deportes d
                LEFT JOIN socios_deportes sd ON d.id = sd.deporte_id
            `;
            const params = [];

            // 2. Agrega el filtro por estado si se proporciona
            if (estado) {
                sql += ' WHERE d.estado = ?';
                params.push(estado);
            }
            
            // 3. Agrupa por deporte y ordena
            sql += ' GROUP BY d.id ORDER BY d.nombre';

            const [rows] = await pool.query(sql, params); 
            
            res.status(200).json(rows);
        } catch (err) {
            console.error('Error al obtener deportes:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    /**
     * @description Obtiene un deporte por su ID.
     * @route GET /api/deportes/:id
     */
    getDeporteById: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = 'SELECT * FROM deportes WHERE id = ?;';
            
            // 3. Obtenemos 'rows' y seleccionamos la primera
            const [rows] = await pool.query(sql, [id]); 
            
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Deporte no encontrado' });
            }
            res.status(200).json(rows[0]);
        } catch (err) {
            console.error('Error al obtener deporte por ID:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    /**
     * @description Crea un nuevo deporte.
     * @route POST /api/deportes
     */
    createDeporte: async (req, res) => {
        try {
            const { nombre, descripcion, estado } = req.body; 
            
            if (!nombre) {
                return res.status(400).json({ message: 'El nombre es requerido' });
            }
            
            const estadoFinal = estado || 'Activo'; 
            const sql = 'INSERT INTO deportes (nombre, descripcion, estado) VALUES (?, ?, ?);';
            
            // 4. Usamos pool.query() para INSERT
            const [result] = await pool.query(sql, [nombre, descripcion, estadoFinal]); 
            
            res.status(201).json({
                message: 'Deporte creado exitosamente',
                id: result.insertId, // <-- 5. Usamos 'insertId'
                ...req.body,
                estado: estadoFinal
            });
        } catch (err) {
            console.error('Error al crear deporte:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    /**
     * @description Actualiza un deporte existente por su ID.
     * @route PUT /api/deportes/:id
     */
    updateDeporte: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion, estado } = req.body; 

            if (!nombre || !estado) {
                return res.status(400).json({ message: 'Nombre y Estado son requeridos' });
            }

            if (estado !== 'Activo' && estado !== 'Inactivo') {
                return res.status(400).json({ message: "El estado debe ser 'Activo' o 'Inactivo'" });
            }
            
            const sql = 'UPDATE deportes SET nombre = ?, descripcion = ?, estado = ? WHERE id = ?;';
            
            const [result] = await pool.query(sql, [nombre, descripcion, estado, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Deporte no encontrado' });
            }

            // 1. Obtener el deporte actualizado (con el campo 'miembros' calculado)
            const [updatedRows] = await pool.query('SELECT * FROM deportes WHERE id = ?', [id]);

            // 2. Devolver el objeto actualizado y DETENER LA FUNCIÓN
            // La sintaxis era { message: '...' } y el frontend espera el objeto en la raíz
            return res.status(200).json(updatedRows[0]); 
            
        } catch (err) {
            console.error('Error al actualizar deporte:', err.message);
            // 3. ¡CORRECCIÓN! Usamos RETURN aquí para evitar el ERR_HTTP_HEADERS_SENT
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    /**
     * @description Elimina un deporte por su ID.
     * @route DELETE /api/deportes/:id
     */
    deleteDeporte: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = 'DELETE FROM deportes WHERE id = ?;';
            
            const [result] = await pool.query(sql, [id]);

            if (result.affectedRows === 0) { // <-- 7. Usamos 'affectedRows'
                return res.status(404).json({ message: 'Deporte no encontrado' });
            }
            res.status(200).json({ message: 'Deporte eliminado exitosamente' });
        } catch (err) {
            // 8. Código de error de MySQL para llave foránea
            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({ error: 'No se puede eliminar el deporte porque tiene socios inscritos.' });
            }
            console.error('Error al eliminar deporte:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    getMembersBySportId: async (req, res) => {
        try {
            const { id: deporteId } = req.params;
            
            const sql = `
                SELECT 
                    s.nombre, 
                    s.dni, 
                    s.email,
                    s.id AS socio_id
                FROM socios s
                JOIN socios_deportes sd ON s.id = sd.socio_id
                WHERE sd.deporte_id = ?
                ORDER BY s.nombre;
            `;
            
            const [rows] = await pool.query(sql, [deporteId]); 
            
            res.status(200).json(rows);
        } catch (err) {
            console.error('Error al obtener socios por deporte:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
    },
};

export default deportesController;