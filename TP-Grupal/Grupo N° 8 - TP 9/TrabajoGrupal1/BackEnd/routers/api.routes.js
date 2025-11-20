// backend/routers/api.routes.js (CONTROLADOR DE SEGURIDAD)
import express from 'express';

// 1. Importaciones: Middleware y Routers de Recursos
import authMiddleware from '../middleware/authMiddleware.js'; 

import sociosRouter from './sociosRouter.js';
import deportesRouter from './deportesRouter.js';
import cuotasRouter from './cuotasRouter.js';
import dashboardRouter from './dashboardRouter.js';

const router = express.Router();

// 2. APLICAR MIDDLEWARE A TODAS LAS RUTAS EN ESTE ARCHIVO
// Cualquier solicitud que entre a /api/... pasará por aquí
router.use(authMiddleware); 

// 3. REGISTRO DE RUTAS PROTEGIDAS (Solo si el token es válido)
// La ruta final es: /api + /socios
router.use('/socios', sociosRouter);
router.use('/deportes', deportesRouter);
router.use('/cuotas', cuotasRouter);
router.use('/dashboard', dashboardRouter);

export default router;