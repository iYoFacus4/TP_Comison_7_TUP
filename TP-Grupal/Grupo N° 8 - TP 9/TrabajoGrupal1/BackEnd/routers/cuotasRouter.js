// BackEnd/routes/cuotasRouter.js
import express from 'express';
// Asegúrate de que el nombre coincida con tu archivo (cuotasController.js)
import cuotasController from '../Controllers/cuotasController.js';

const router = express.Router();

// --- Definición de Rutas para Cuotas ---

// GET /api/cuotas (Obtiene TODAS las cuotas con info del socio)
router.get('/', cuotasController.getAllCuotas);

// POST /api/cuotas (Crea una nueva cuota)
router.post('/', cuotasController.createCuota);

// PUT /api/cuotas/:id (Actualiza el estado de una cuota, ej: a 'Pagado')
router.put('/:id', cuotasController.updateCuotaEstado);

// DELETE /api/cuotas/:id (Elimina una cuota)
router.delete('/:id', cuotasController.deleteCuota);

router.post('/registrar-pago', cuotasController.registerPaymentByDni);

// --- Exportamos el router ---
export default router;