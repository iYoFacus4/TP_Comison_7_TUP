import express from "express";
import {
  getAsistentes,
  getAsistenteById,
  createAsistente,
  updateAsistente,
  deleteAsistente
} from "../controllers/asistentesController.js";

const router = express.Router();

router.get("/", getAsistentes);
router.get("/:id", getAsistenteById);
router.post("/", createAsistente);
router.put("/:id", updateAsistente);
router.delete("/:id", deleteAsistente);

export default router;
