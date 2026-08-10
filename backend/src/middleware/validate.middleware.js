import { AppError, BadRequestError } from '../utils/appError.js';

const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errorMessage = result.error.issues[0].message;
        
        throw new BadRequestError(errorMessage)
    }

    req.body = result.data;

    next();
};

export{
    validate
}