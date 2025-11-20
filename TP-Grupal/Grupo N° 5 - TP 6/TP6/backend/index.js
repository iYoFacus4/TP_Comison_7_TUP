import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import asistentesRouter from "./routes/asistentesRouter.js";
import artistasRouter from "./routes/artistasRouter.js";
import eventosRouter from "./routes/eventosRouter.js";
import usuariosRouter from "./routes/usuariosRouter.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/asistentes", asistentesRouter);
app.use("/api/artistas", artistasRouter);
app.use("/api/eventos", eventosRouter);
app.use("/api/usuarios", usuariosRouter);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));

