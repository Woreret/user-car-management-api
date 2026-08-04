import { Router } from "express";
import {deleteUser, loginUser, registerUser, updateUserName } from "../controllers/user.controller.js";
import { addCar } from "../controllers/car.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/updateUserName', authMiddleware, updateUserName);
router.delete('/deleteUser', authMiddleware, deleteUser);

router.post('/addCar', authMiddleware, addCar);

export default router;