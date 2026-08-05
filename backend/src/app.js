import express from "express";
import userRouter from "./routes/users.route.js";
import { swaggerDocs } from "./config/swagger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

swaggerDocs(app);

app.use("/api/v1/users", userRouter);

export default app;