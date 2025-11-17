// backend/Controllers/sociosController.js (VERSIÓN MYSQL)
import pool from '../config/db.js'; // <-- Importamos 'pool'

const sociosController = {

    getAllSocios: async (req, res) => {
        try {
            const sql = 'SELECT * FROM socios;';
            const [rows] = await pool.query(sql); // <-- Sintaxis MySQL
            res.status(200).json(rows);
        } catch (err) {
            console.error('Error al obtener socios:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getSocioById: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = 'SELECT * FROM socios WHERE id = ?;';
            
            const [rows] = await pool.query(sql, [id]); // <-- Sintaxis MySQL
            
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Socio no encontrado' });
            }
            res.status(200).json(rows[0]);
        } catch (err) {
            console.error('Error al obtener socio por ID:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    createSocio: async (req, res) => {
        try {
            const { nombre, dni, email, telefono, fecha_nacimiento } = req.body;
            if (!nombre || !dni || !email) {
                return res.status(400).json({ message: 'Nombre, DNI y Email son requeridos' });
            }
            const sql = 'INSERT INTO socios (nombre, dni, email, telefono, fecha_nacimiento) VALUES (?, ?, ?, ?, ?);';
            
            const [result] = await pool.query(sql, [nombre, dni, email, telefono, fecha_nacimiento]); // <-- Sintaxis MySQL
            
            res.status(201).json({
                message: 'Socio creado exitosamente',
                id: result.insertId, // <-- 'insertId' para MySQL
                ...req.body
            });
        } catch (err) {
            console.error('Error al crear socio:', err.message);
            if (err.code === 'ER_DUP_ENTRY') { // <-- Código de error MySQL
                return res.status(409).json({ error: 'El DNI o Email ya existe' });
            }
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    
    getSocioDeportes: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = 'SELECT deporte_id FROM socios_deportes WHERE socio_id = ?;';
            
            const [rows] = await pool.query(sql, [id]); // <-- Sintaxis MySQL
            
            const sportIds = rows.map(row => row.deporte_id);
            res.status(200).json(sportIds);
        } catch (err) {
            console.error('Error al obtener deportes del socio:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    updateSocio: async (req, res) => {
        let connection; // Definimos la conexión aquí para usarla en el finally/catch
        try {
            const { id } = req.params;
            const { 
                nombre, dni, email, telefono, fecha_nacimiento, 
                associatedSports 
            } = req.body;

            if (!nombre || !dni || !email) {
                return res.status(400).json({ message: 'Nombre, DNI y Email son requeridos' });
            }
            
            // --- INICIO DE TRANSACCIÓN MYSQL ---
            connection = await pool.getConnection();
            await connection.beginTransaction();

            // Tarea 1: Actualizar 'socios'
            const sqlSocio = 'UPDATE socios SET nombre = ?, dni = ?, email = ?, telefono = ?, fecha_nacimiento = ? WHERE id = ?;';
            await connection.query(sqlSocio, [nombre, dni, email, telefono, fecha_nacimiento, id]);

            // Tarea 2: Borrar inscripciones viejas
            const sqlDeleteSports = 'DELETE FROM socios_deportes WHERE socio_id = ?;';
            await connection.query(sqlDeleteSports, [id]);

            // Tarea 3: Insertar nuevas inscripciones
            if (associatedSports && associatedSports.length > 0) {
                // mysql2 nos deja insertar múltiples filas de una vez
                const sqlInsertSport = 'INSERT INTO socios_deportes (socio_id, deporte_id) VALUES ?;';
                const values = associatedSports.map(deporte_id => [id, deporte_id]);
                await connection.query(sqlInsertSport, [values]);
            }

            // --- FIN DE TRANSACCIÓN MYSQL ---
            await connection.commit();
            
            res.status(200).json({ message: 'Socio actualizado exitosamente (con deportes)' });

        } catch (err) {
            // Si algo falló, revertimos todo
            if (connection) await connection.rollback();
            console.error('Error al actualizar socio (con deportes):', err.message);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'El DNI o Email ya existe' });
            }
            res.status(500).json({ error: 'Error interno del servidor' });
        } finally {
            // Pase lo que pase, liberamos la conexión
            if (connection) connection.release();
        }
    },

    deleteSocio: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = 'DELETE FROM socios WHERE id = ?;';
            
            const [result] = await pool.query(sql, [id]); // <-- Sintaxis MySQL

            if (result.affectedRows === 0) { // <-- 'affectedRows' para MySQL
                return res.status(404).json({ message: 'Socio no encontrado' });
            }
            res.status(200).json({ message: 'Socio eliminado exitosamente' });
        } catch (err) {
            console.error('Error al eliminar socio:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export default sociosController;