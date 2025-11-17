import express from "express";
import { obtenerEspecialidades } from "../controllers/especialidadControllers.js";

const router = express.Router()

router.get("/", obtenerEspecialidades);

export default router;
