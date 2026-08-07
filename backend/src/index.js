import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    } catch (error) {
        console.log(`Error to connect DB ${error}`);
    }
};

startServer();