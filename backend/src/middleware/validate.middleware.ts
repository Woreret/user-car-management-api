import { NextFunction, Request, Response } from 'express';
import { AppError, BadRequestError } from '../utils/appError.js';
import { ZodSchema } from 'zod';

const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errorMessage = result.error.issues[0].message;

        return next(new BadRequestError(errorMessage))
    }

    req.body = result.data;

    next();
};

export {
    validate
}