import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const{Pool} = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const connectDB = async()=>{
    try {
        const client = await pool.connect()
        console.log(`Successfully connect to db`)
    } catch (error) {
        console.log(`Error to load db ${error}`)
        process.exit(1);
    }
}

export { pool, connectDB };