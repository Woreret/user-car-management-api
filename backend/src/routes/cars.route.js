import { Router } from "express";
import { addCar, deleteCar, getCars, updateCar } from "../controllers/car.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerCar } from "../validators/car.validator.js";
import { updateCarScheme } from "../validators/car.validator.js";




const router = Router();
/**
 * @openapi
 * /api/v1/cars/addCar:
 *   post:
 *     summary: Add a new vehicle to authenticated user's profile
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarInput'
 *     responses:
 *       201:
 *         description: Vehicle added successfully
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.post('/addCar', authMiddleware, validate(registerCar), addCar);

/**
 * @openapi
 * /api/v1/cars/my:
 *   get:
 *     summary: Retrieve all vehicles belonging to authenticated user
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of vehicle objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CarResponse'
 *       404:
 *         description: No cars found for this user
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.get('/my', authMiddleware, getCars);

/**
 * @openapi
 * /api/v1/cars/updateCar/{id}:
 *   put:
 *     summary: Update a vehicle by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarInput'
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       403:
 *         description: Access denied (vehicle belongs to another user)
 *       404:
 *         description: Vehicle not found
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.put('/updateCar/:id', authMiddleware, validate(updateCarScheme), updateCar);

/**
 * @openapi
 * /api/v1/cars/deleteCar/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       403:
 *         description: Access denied (vehicle belongs to another user)
 *       404:
 *         description: Vehicle not found
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.delete('/deleteCar/:id', authMiddleware, deleteCar);

export default router;