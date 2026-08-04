import { pool } from "../config/database.js";

const createCar = async(brand, model, year, userId) => {
    await pool.query(
        'INSERT INTO cars(brand, model, year, user_id) VALUES($1,$2,$3,$4)', [brand,model,year,userId]
    )

}

export{
    createCar
}