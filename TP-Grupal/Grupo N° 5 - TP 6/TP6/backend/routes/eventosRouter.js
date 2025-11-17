import express from "express";
import {
  getEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
  getArtistasPorEvento,
  asociarArtistaAEvento,
  removerArtistaDeEvento,
  getAsistentesPorEvento,
  inscribirAsistenteAEvento,
  removerAsistenteDeEvento
} from "../controllers/eventosController.js";

const router = express.Router();

router.get("/", getEventos);
router.get("/:id", getEventoById);
router.post("/", createEvento);
router.put("/:id", updateEvento);
router.delete("/:id", deleteEvento);



router.get("/:id/artistas", getArtistasPorEvento);
router.post("/:id/artistas", asociarArtistaAEvento);
router.delete("/:id/artistas/:idArtista", removerArtistaDeEvento);

// Rutas para Asistentes en un Evento
router.get("/:id/asistentes", getAsistentesPorEvento);
router.post("/:id/asistentes", inscribirAsistenteAEvento);
router.delete("/:id/asistentes/:idAsistente", removerAsistenteDeEvento);

export default router;
