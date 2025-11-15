// /backend/db.js

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
// Carga las variables de entorno del archivo .env
dotenv.config(); 

// Configuración del pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para probar la conexión
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Base de datos conectada exitosamente a la DB: " + process.env.DB_NAME);
        connection.release(); // Devuelve la conexión al pool
    } catch (error) {
        console.error("❌ Error al conectar la base de datos:", error.message);
        // Opcional: Terminar la aplicación si la conexión falla
        // process.exit(1);
    }
}

// Exportamos el pool y la función de prueba
export { pool, testConnection };