import dotenv from "dotenv"
import { connectDB } from "./config/database.js";
import app from "./app.js";
import { errorCatch } from "./middleware/error.middleware.js";


dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
        })

        app.use(errorCatch);

        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(`Error to connect DB ${error}`)
    }
}

startServer()