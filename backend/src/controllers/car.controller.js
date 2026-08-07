import { createCar, deleteCarById, getUserCars, updateCarById } from "../services/car.service.js";
import { BadRequestError, NotFoundError } from "../utils/appError.js";

const addCar = async (req, res, next) => {
    try {
        const { brand, model, year } = req.body;
        const userId = req.user.id;

        if (!brand || !model || !year) {
            throw new BadRequestError("All fields are required");
        }

        await createCar(brand, model, year, userId);
        res.status(201).json({ message: `Car ${brand} ${model} added` });
    } catch (error) {
        next(error);
    }
};

const getCars = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const cars = await getUserCars(userId);

        if (cars.length === 0) {
            throw new NotFoundError("Cars not found");
        }

        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
};

const deleteCar = async (req, res, next) => {
    try {
        const carId = req.params.id;
        const userId = req.user.id;

        await deleteCarById(carId, userId);

        res.status(200).json({ message: "Car was deleted" });
    } catch (error) {
        next(error);
    }
};

const updateCar = async (req, res, next) => {
    try {
        const { brand, model, year } = req.body;
        const carId = req.params.id;
        const userId = req.user.id;

        await updateCarById(carId, userId, brand, model, year);

        res.status(200).json({ message: "Car was updated" });
    } catch (error) {
        next(error);
    }
};

export {
    addCar,
    getCars,
    deleteCar,
    updateCar
};