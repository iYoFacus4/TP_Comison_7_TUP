// backend/Controllers/auth.controllers.js (COMPLETO)
import pool from '../config/db.js'; 
import jwt from 'jsonwebtoken'; // Necesario para crear tokens

// Nota: Las funciones 'register' y 'login' se asumen correctas para MySQL/JWT
// (Usaremos 'usuariosController' como guía, ya que es el que funciona)

const authController = {

    register: async (req, res) => { /* ... (Tu lógica de registro va aquí) ... */ },

    login: async (req, res) => {
        try {
            const { usuario: email, password } = req.body;
            // ... (Validación y búsqueda de usuario en DB) ...
            
            // 1. Verificar contraseña (comparación directa)
            if (usuario.contrasena !== password) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // 2. CREAR Y FIRMAR EL TOKEN
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email, rol: usuario.rol },
                process.env.JWT_SECRET, // Usa la clave que definiste en el .env
                { expiresIn: '1h' }
            );

            // 3. Devolver el token y los datos del usuario
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
            console.error('Error en login:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export default authController;