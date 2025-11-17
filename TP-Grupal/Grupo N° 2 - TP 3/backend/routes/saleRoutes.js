import { Router } from 'express';
import { getSales, createSale, deleteSale } from '../controllers/saleController.js';
import { authRequired } from '../middlewares/validateToken.js'; 

const router = Router();

router.get('/', getSales);
router.post('/', authRequired, createSale); 
router.delete('/:id', authRequired, deleteSale);

export default router;