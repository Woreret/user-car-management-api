import { Router } from "express";
import { deleteUser, getAllUsers, loginUser, registerUser, updateUserName } from "../controllers/user.controller.js";
import { addCar, deleteCar, getCars, updateCar } from "../controllers/car.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/user.validator.js";
import { registerCar } from "../validators/car.validator.js";

const router = Router();

/**
 * @openapi
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already in use or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/register',validate(registerSchema) ,registerUser);

/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     summary: Authenticate user and receive JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *       200:
 *         description: Authenticated successfully, returns JWT bearer token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login',validate(loginSchema), loginUser);

/**
 * @openapi
 * /api/v1/users/updateUserName:
 *   put:
 *     summary: Update authenticated user's name
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserNameInput'
 *     responses:
 *       200:
 *         description: User name updated successfully
 *       400:
 *         description: Bad request or user not found
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.put('/updateUserName', authMiddleware, updateUserName);

/**
 * @openapi
 * /api/v1/users/deleteUser:
 *   delete:
 *     summary: Delete authenticated user account and all associated vehicles
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account and associated vehicles deleted successfully
 *       400:
 *         description: User not found
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.delete('/deleteUser', authMiddleware, deleteUser);

/**
 * @openapi
 * /api/v1/users/all:
 *   get:
 *     summary: Retrieve all registered users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (requires admin role)
 */
router.get('/all', authMiddleware, authorize('admin'), getAllUsers);

/**
 * @openapi
 * /api/v1/users/addCar:
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
 * /api/v1/users/my:
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
 * /api/v1/users/updateCar/{id}:
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
router.put('/updateCar/:id', authMiddleware, validate(updateCar), updateCar);

/**
 * @openapi
 * /api/v1/users/deleteCar/{id}:
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