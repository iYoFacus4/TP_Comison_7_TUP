import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usuariosRouter from "./routers/usuarioRouters.js"
import doctoresRouter from "./routers/doctoresRouters.js"
import especialidadesRouter from "./routers/especialidadesRoutes.js"
import pacientesRouters from "./routers/pacientesRouters.js"
import "./config/db.js";


dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type"], 
}));
app.use(express.json());

app.use("/usuarios", usuariosRouter);
app.use("/doctores", doctoresRouter);
app.use("/especialidades", especialidadesRouter);
app.use("/pacientes", pacientesRouters);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
