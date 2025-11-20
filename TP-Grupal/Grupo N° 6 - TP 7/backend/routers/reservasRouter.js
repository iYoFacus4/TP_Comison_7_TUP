// Rutas de reservas con validaciones de cupo y duplicados.
// Protegidas con auth; dejé crear/editar/eliminar sólo para admin como ejemplo de “futura diferenciación de roles”.

const express = require('express');
const router = express.Router();
const {
  listarReservas,
  obtenerReserva,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
} = require('../controllers/reservasController');

const { authRequired, roleRequired } = require('../middleware/authMiddleware');

// Listado y detalle (requiere login)
router.get('/', authRequired, listarReservas);
router.get('/:id', authRequired, obtenerReserva);

// Crear / Actualizar / Eliminar (sólo admin)
router.post('/', authRequired, roleRequired('admin'), crearReserva);
router.put('/:id', authRequired, roleRequired('admin'), actualizarReserva);
router.delete('/:id', authRequired, roleRequired('admin'), eliminarReserva);

module.exports = router;
