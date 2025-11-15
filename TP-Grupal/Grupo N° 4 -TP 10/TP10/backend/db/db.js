import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Crear pool de conexiones a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Exportar la versión con promesas del pool
const promisePool = pool.promise();

// Función para probar la conexión
export const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log("✅ Conexión exitosa a la base de datos MySQL");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
    return false;
  }
};

export default promisePool;
