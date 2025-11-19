import pool from '../config/db.js';

const usuariosController = {

    /**
     * @description Registra un nuevo usuario en la base de datos.
     * @route POST /api/usuarios/register
     */
    register: async (req, res) => {
        try {
            const { email, password, rol, socio_id } = req.body;

            // 1. Validaciones básicas
            if (!email || !password) {
                return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
            }

            // (Aquí es donde encriptarías la contraseña con bcrypt en un proyecto real)
            // const hashedPassword = await bcrypt.hash(password, 10);
            
            const rolFinal = rol || 'socio'; // Por defecto es socio

            // 2. Insertar en la base de datos
            const sql = 'INSERT INTO usuarios (email, contrasena, rol, socio_id) VALUES (?, ?, ?, ?)';
            const [result] = await pool.query(sql, [email, password, rolFinal, socio_id || null]);

            res.status(201).json({ 
                message: 'Usuario registrado exitosamente',
                id: result.insertId,
                email,
                rol: rolFinal
            });

        } catch (err) {
            console.error('Error en registro:', err.message);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'El email ya está registrado' });
            }
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    /**
     * @description Verifica las credenciales para iniciar sesión.
     * @route POST /api/usuarios/login
     */
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Faltan credenciales' });
            }

            // 1. Buscar el usuario por email
            const sql = 'SELECT * FROM usuarios WHERE email = ?';
            const [rows] = await pool.query(sql, [email]);

            if (rows.length === 0) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            const usuario = rows[0];

            // 2. Verificar contraseña (comparación directa por ahora)
            if (usuario.contrasena !== password) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // 3. Login exitoso: Devolvemos los datos del usuario (sin la contraseña)
            res.status(200).json({
                message: 'Login exitoso',
                user: {
                    id: usuario.id,
                    email: usuario.email,
                    rol: usuario.rol,
                    socio_id: usuario.socio_id
                }
            });

        } catch (err) {
            console.error('Error en login:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export default usuariosController;