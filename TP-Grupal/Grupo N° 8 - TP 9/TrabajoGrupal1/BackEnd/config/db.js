// backend/config/db.js (VERSIÓN PARA MYSQL)
import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';

// Apuntamos al .env que está en la carpeta /BackEnd
dotenv.config({ path: '../.env' }); 

// Creamos un "pool" de conexiones para MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'facugay123',
    database: process.env.DB_NAME || 'club_deportivo_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificamos la conexión al iniciar
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión con MySQL establecida.');
        connection.release(); // Soltamos la conexión de vuelta al pool
    } catch (err) {
        console.error('Error al conectar con MySQL:', err.message);
    }
})();

// Exportamos el pool para que los controladores lo usen
export default pool;