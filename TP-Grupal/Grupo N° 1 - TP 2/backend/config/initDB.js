// config/db.js
import mysql from "mysql2";
import fs from "fs";
import dotenv from "dotenv";

//Este archivo crea la base de datos y la carga al workbench

dotenv.config();

//  Lee el archivo base_datos.sql
const sqlScript = fs.readFileSync("base_datos.sql", "utf8");

// Conexión a MySQL (sin elegir base todavía)
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  multipleStatements: true 
});

connection.connect((err) => {
  if (err) {
    console.error(" Error al conectar con MySQL:", err);
    return;
  }
  console.log(" Conectado a MySQL");

  //  Ejecuta el script SQL completo
  connection.query(sqlScript, (err, results) => {
    if (err) {
      console.error(" Error al ejecutar el script SQL:", err);
    } else {
      console.log(" Base de datos y tablas creadas correctamente");
    }
    connection.end();
  });
});
