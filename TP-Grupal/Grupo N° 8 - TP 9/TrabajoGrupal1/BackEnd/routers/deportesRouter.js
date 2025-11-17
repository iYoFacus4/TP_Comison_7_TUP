// backend/routers/deportesRouter.js
import express from 'express';
import deportesController from '../Controllers/deportesController.js';

const router = express.Router();

// --- Definición de Rutas para Deportes ---

// GET /api/deportes (Obtiene todos)
router.get('/', deportesController.getAllDeportes);

// GET /api/deportes/:id (Obtiene uno por ID)
router.get('/:id', deportesController.getDeporteById);

// POST /api/deportes (Crea uno nuevo)
router.post('/', deportesController.createDeporte);

// PUT /api/deportes/:id (Actualiza uno por ID)
router.put('/:id', deportesController.updateDeporte);

// DELETE /api/deportes/:id (Elimina uno por ID)
router.delete('/:id', deportesController.deleteDeporte);

// --- Exportamos el router ---
export default router;