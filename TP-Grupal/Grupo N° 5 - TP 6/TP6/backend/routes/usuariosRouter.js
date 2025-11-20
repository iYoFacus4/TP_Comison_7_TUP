import express from "express";
import { getUsuarios, createUsuario, loginUsuario } from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/", getUsuarios);
router.post("/", createUsuario);
router.post("/login", loginUsuario);

export default router;
