import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import { testConnection } from "./db/db.js";

// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import clientRoutes from "./routes/clientRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(
  morgan("dev", {
    skip: (req) => req.url.startsWith("/api-docs"),
  })
);
app.use(helmet());
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  console.log("🌐 Se accedió a la ruta raíz /");
  res.send("Backend funcionando DE PERLAS");
});

// Ruta de prueba
/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Endpoint de prueba para verificar que el servidor está funcionando
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: Servidor funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 */
app.get("/api/ping", (req, res) => {
  console.log("Se recibió un ping desde el frontend o navegador");
  res.json({ ok: true });
});

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Acceso rápido: http://localhost:3001/api-docs

// Iniciar servidor y probar conexión a la base de datos
app.listen(PORT, async () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  console.log(`🔧 Probar ping: http://localhost:${PORT}/api/ping`);
  console.log(
    `Documentacion Swagger corriendo en http://localhost:${PORT}/api-docs`
  );

  // Probar conexión a la base de datos
  await testConnection();
});
