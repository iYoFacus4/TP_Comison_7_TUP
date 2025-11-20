import pool from '../config/db.js';
import jwt from 'jsonwebtoken';

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
        // La variable 'token' no necesita ser declarada aquí

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Faltan credenciales' });
            }

            // 1. VERIFICACIÓN CRÍTICA DEL JWT_SECRET
            if (!process.env.JWT_SECRET) {
                console.error("🛑 JWT_SECRET NO DEFINIDO. Revisar archivo .env");
                // Devolvemos 500 aquí para detener el proceso
                return res.status(500).json({ error: 'Fallo de configuración: Clave secreta faltante.' });
            }

            // 2. Buscar usuario en DB
            const sql = 'SELECT * FROM usuarios WHERE email = ?';
            const [rows] = await pool.query(sql, [email]);

            if (rows.length === 0) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            const usuario = rows[0];

            // 3. Verificar contraseña
            if (usuario.contrasena !== password) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // 4. CREAR Y FIRMAR EL TOKEN (Ahora seguro)
            const token = jwt.sign( 
                { id: usuario.id, email: usuario.email, rol: usuario.rol },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // 5. Login exitoso
            return res.status(200).json({
                message: 'Login exitoso',
                token: token,
                user: {
                    id: usuario.id,
                    email: usuario.email,
                    rol: usuario.rol,
                    socio_id: usuario.socio_id
                }
            });

        } catch (err) {
            console.error('Error FATAL en el proceso de login:', err.message);
            // Este return maneja cualquier error de DB que pueda ocurrir
            return res.status(500).json({ error: 'Fallo interno del servidor.' });
        }
    }
};

export default usuariosController;