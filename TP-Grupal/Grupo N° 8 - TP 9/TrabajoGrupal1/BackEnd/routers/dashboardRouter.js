// backend/routes/dashboardRouter.js
import express from 'express';
import dashboardController from '../Controllers/dashboardController.js';

const router = express.Router();

// GET /api/dashboard/stats
router.get('/stats', dashboardController.getDashboardStats);

export default router;