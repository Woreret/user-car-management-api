import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError.js";

const errorCatch = (err: any, req: Request, res: Response, next: NextFunction) => {
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