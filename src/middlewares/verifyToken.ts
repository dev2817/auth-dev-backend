import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.ts';
import { verifyToken } from '../utils/token.ts';
import { JwtPayload } from '../types/types.ts';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied', success: false });
    }

    try {
        const result = await verifyToken(token);

        if (!result.success) {
            return res.status(401).json({ message: 'Invalid token', success: false });
        }

        req.user = result.data as JwtPayload;

        next();
    } catch (error) {
        logger.error('Error in auth middleware:', error);
        return res.status(500).json({ message: 'Server error', success: false });
    }
};