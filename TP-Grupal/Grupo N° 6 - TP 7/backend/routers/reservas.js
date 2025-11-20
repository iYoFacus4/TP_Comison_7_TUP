// Rutas de reservas
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reservasController');
const { authRequired } = require('../middleware/authMiddleware');

// Rutas protegidas
router.get('/', authRequired, ctrl.listar);            // Listar reservas
router.post('/', authRequired, ctrl.crear);            // Crear nueva reserva
router.put('/:id', authRequired, ctrl.actualizar);     // Actualizar reserva
router.delete('/:id', authRequired, ctrl.eliminar);    // Cancelar/eliminar reserva

module.exports = router;
