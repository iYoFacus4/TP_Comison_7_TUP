const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/actividadesController');
const { authRequired } = require('../middleware/authMiddleware');
const { actividadesConCupos } = require('../controllers/actividadesCuposController');


router.get('/', authRequired, ctrl.list);
router.get('/con-cupos', authRequired, ctrl.listConCupos);

router.get('/:id', authRequired, ctrl.getById);
router.post('/', authRequired, ctrl.create);
router.put('/:id', authRequired, ctrl.update);
router.delete('/:id', authRequired, ctrl.remove);

module.exports = router;
