import { pool } from "../config/database.js";
import { NotFoundError, ForbiddenError } from "../utils/appError.js";

const checkCar = async (carId) => {
    const res = await pool.query('SELECT * FROM cars WHERE id = $1', [carId]);
    
    if (res.rows.length === 0) {
        throw new NotFoundError('Car not found');
    }
};

const createCar = async (brand, model, year, userId) => {
    await pool.query(
        'INSERT INTO cars(brand, model, year, user_id) VALUES($1,$2,$3,$4)', 
        [brand, model, year, userId]
    );
};

const getUserCars = async (userId) => {
    const res = await pool.query(
        'SELECT * FROM cars WHERE user_id = $1', 
        [userId]
    );
    return res.rows;
};

const deleteCarById = async (carId, userId) => {
    await checkCar(carId); 
    
    const result = await pool.query(
        'DELETE FROM cars WHERE id = $1 AND user_id = $2 RETURNING *',
        [carId, userId]
    );

    if (result.rows.length === 0) {
        throw new ForbiddenError('Access denied');
    }
};

const updateCarById = async (carId, userId, brand, model, year) => {
    await checkCar(carId); 
    
    const result = await pool.query(
        'UPDATE cars SET brand = $1, model = $2, year = $3 WHERE id = $4 AND user_id = $5 RETURNING *', 
        [brand, model, year, carId, userId]
    );

    if (result.rows.length === 0) {
        throw new ForbiddenError('Access denied');
    }
};

export {
    createCar,
    getUserCars,
    deleteCarById,
    updateCarById
};