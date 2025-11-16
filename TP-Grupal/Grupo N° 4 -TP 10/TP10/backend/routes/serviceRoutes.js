import express from "express";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Obtener todos los servicios
 *     tags: [Servicios]
 *     parameters:
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         description: Filtrar por disponibilidad (true/false)
 *     responses:
 *       200:
 *         description: Lista de servicios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       duration:
 *                         type: integer
 *                       price:
 *                         type: number
 *                       available:
 *                         type: boolean
 *                       fecha_creacion:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get("/", getAllServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Obtener un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Servicio encontrado
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get("/:id", getServiceById);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Crear un nuevo servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - duration
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Corte de cabello
 *               description:
 *                 type: string
 *                 example: Corte personalizado según preferencias
 *               duration:
 *                 type: integer
 *                 example: 30
 *                 description: Duración en minutos
 *               price:
 *                 type: number
 *                 example: 5000.00
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post("/", authenticateToken, createService);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Actualizar un servicio existente
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - duration
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               price:
 *                 type: number
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Servicio actualizado exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.put("/:id", authenticateToken, updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Eliminar un servicio
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         description: Conflicto - Servicio tiene citas asociadas
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.delete("/:id", authenticateToken, deleteService);

export default router;
