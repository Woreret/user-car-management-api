import { AppError } from "../utils/appError.js";

const errorCatch = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status(statusCode).json({
        status: status,
        message: err.message || 'Internal server error'
    });
};

export {
    errorCatch
};