import { UnauthorizedError, ForbiddenError } from '../utils/appError.js';

const authorize = (...roles) => {
    const roleCheck = (req, res, next) => {
        if (!req.user) {
            return next(new UnauthorizedError('User undefined'));
        }
        if (roles.includes(req.user.role)) {
            next();
        } else {
            return next(new ForbiddenError('You do not have permission to perform this action'));
        }
    };
    return roleCheck;
};

export {
    authorize
};