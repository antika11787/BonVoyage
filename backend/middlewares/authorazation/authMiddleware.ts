import { AuthRequest } from '../../interfaces/auth';
import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import response from '../../utils/sendResponse';

const isLoggedin = (req: AuthRequest, res: Response, next: NextFunction) : any => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return response(res, 401, 'No token, authorization denied');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user =  (decoded as JwtPayload).data;
        next();
    } catch (error) {
        return response(res, 401, 'Token is not valid');
    }
};

const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) : any => {
    if (req.user?.role !== 'SUPER_ADMIN') {
        return response(res, 403, 'You are not authorized to access this route');
    }
    next();
}

export {
    isLoggedin,
    isAdmin
}