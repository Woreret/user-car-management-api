import express from "express";
import userRouter from "./routes/users.route.js";
import carsRouter from "./routes/cars.route.js";
import { swaggerDocs } from "./config/swagger.js";
import { errorCatch } from "./middleware/error.middleware.js";
import { NotFoundError } from "./utils/appError.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

swaggerDocs(app);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/cars", carsRouter);

app.all("/*splat", (req, res, next) => {
    next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(errorCatch);

export default app;