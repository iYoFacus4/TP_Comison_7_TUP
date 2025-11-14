import { Router } from 'express';
//import { authRequired } from '../middlewares/validateToken.js'; 
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', authRequired, createProduct);

router.put('/:id', authRequired, updateProduct);

router.delete('/:id', authRequired,  deleteProduct);

export default router;
