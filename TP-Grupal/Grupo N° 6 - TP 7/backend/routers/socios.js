const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/sociosController');
const { authRequired } = require('../middleware/authMiddleware');

// Protegido: se asume que el front mandará Bearer token
router.get('/', authRequired, ctrl.list);
router.get('/:id', authRequired, ctrl.getById);
router.post('/', authRequired, ctrl.create);
router.put('/:id', authRequired, ctrl.update);
router.delete('/:id', authRequired, ctrl.remove);

module.exports = router;
