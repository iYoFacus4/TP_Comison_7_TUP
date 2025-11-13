import express, { Router } from "express";
import { obtenerPacientes, obtenerPacientePorMail, modificarPaciente, eliminarPaciente, agregarPaciente } from "../controllers/pacientesControllers.js";

const router = express.Router();

// GET → /usuarios
router.get("/", obtenerPacientes);

// POST → /usuarios
router.post("/", agregarPaciente);

router.put("/:id", modificarPaciente);

router.delete("/:id", eliminarPaciente );

router.post("/obtenerPorMail", obtenerPacientePorMail);


export default router;
