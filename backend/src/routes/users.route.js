import { Router } from "express";
import {deleteUser, loginUser, registerUser, updateUserName } from "../controllers/user.controller.js";
import { addCar, deleteCar, getCars, updateCar } from "../controllers/car.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/updateUserName', authMiddleware, updateUserName);
router.delete('/deleteUser', authMiddleware, deleteUser);

router.post('/addCar', authMiddleware, addCar);
router.get('/my', authMiddleware, getCars);
router.delete('/deleteCar/:id', authMiddleware, deleteCar);
router.put('/updateCar/:id', authMiddleware, updateCar);


export default router;