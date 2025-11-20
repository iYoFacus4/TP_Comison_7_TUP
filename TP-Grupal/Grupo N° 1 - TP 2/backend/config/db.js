// Este archivo, es una conexion constante a la BD, es decir que desde aqui, se conectan los
// controladores


import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "ClinicaDB",
});
