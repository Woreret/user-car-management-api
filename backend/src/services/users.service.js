import { pool } from "../config/database.js";
import bcrypt from "bcrypt";


const createUser = async(name,email,role,password)=>{
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );

        if(result.rows.length > 0){
            throw new Error('User already exist')
        }
        
        const hashLvl = 10;

        const hashPassword = await bcrypt.hash(password, hashLvl);

        await pool.query('INSERT INTO users(name,email,role,password) VALUES($1,$2,$3,$4)', [name,email,role,hashPassword]);

}

const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

const findUser = async(email)=>{
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

const findUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

const updateUser = async (newName, userId) => {
    const user = await findUserById(userId); 
    
    if (!user) {
        throw new Error('User not found');
    }

    await pool.query('UPDATE users SET name = $1 WHERE id = $2', [newName, userId]);
}

const deleteUserById = async(userId)=>{
    const user = await findUserById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
}
export{
    createUser,
    comparePassword,
    findUser,
    updateUser,
    deleteUserById
}