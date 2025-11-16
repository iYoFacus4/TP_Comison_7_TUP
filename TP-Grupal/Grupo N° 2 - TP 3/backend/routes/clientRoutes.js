import { Router } from 'express';
import { getClients, createClient, updateClient, deleteClient } from '../controllers/clientController.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();


router.get('/', getClients);


router.post('/', authRequired, createClient);
router.put('/:id', authRequired, updateClient);
router.delete('/:id', authRequired, deleteClient);

export default router;