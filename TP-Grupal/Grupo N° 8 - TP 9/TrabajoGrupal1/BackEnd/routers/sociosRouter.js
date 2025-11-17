import express from 'express';
import sociosController from '../Controllers/sociosController.js';
import cuotasController from '../Controllers/cuotasController.js'; 

const router = express.Router();

// --- Rutas de Socios ---
router.get('/', sociosController.getAllSocios);
router.get('/:id', sociosController.getSocioById);
router.post('/', sociosController.createSocio);
router.put('/:id', sociosController.updateSocio); // (Esta ruta ahora hace más cosas)
router.delete('/:id', sociosController.deleteSocio);

// --- Rutas de Cuotas (del socio) ---
router.get('/:id/cuotas', cuotasController.getCuotasBySocioId);

// --- ¡NUEVA RUTA DE DEPORTES! ---
router.get('/:id/deportes', sociosController.getSocioDeportes); // <-- NUEVA LÍNEA

export default router;
