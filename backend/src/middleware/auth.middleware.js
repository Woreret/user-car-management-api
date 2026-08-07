import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../utils/appError.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new UnauthorizedError('Unauthorized: Token missing or malformed'));
    }

    const secret = process.env.SECRET_KEY;
    const token = authHeader.split(' ')[1];

    try {
        const verify = jwt.verify(token, secret);
        req.user = verify;
        return next();
    } catch (error) {
        return next(new ForbiddenError('Forbidden: Invalid or expired token'));
    }
};

export { authMiddleware };