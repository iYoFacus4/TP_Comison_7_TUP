import express from "express";
import { obtenerDoctores, agregarDoctores, eliminarDcotores, modificarDoctores, obtenerPorEspecialidad } from "../controllers/doctoresControllers.js";

const router = express.Router()

router.get("/", obtenerDoctores);

router.post("/", agregarDoctores);

router.put("/:id", modificarDoctores);

router.delete("/:id", eliminarDcotores)

router.get("/:especialidad", obtenerPorEspecialidad)

export default router;