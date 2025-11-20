import express from "express";
import { obtenerUsuarios, agregarUsuario, obtenerUsuarioPorMail } from "../controllers/usuariosControllers.js";

const router = express.Router();

// GET → /usuarios
router.get("/", obtenerUsuarios);

// POST → /usuarios
router.post("/", agregarUsuario);

router.post("/obtenerPorMail", obtenerUsuarioPorMail)


export default router;
