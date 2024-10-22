import { logger } from '../utils/logger.ts';
import { verifyToken } from '../utils/token.ts';
import { JwtPayload } from '../types/types.ts';

const authMiddleware = async (req: any, res: any, next: any) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];

    if (!token) {
        res.send({ message: 'No token provided, authorization denied', success: false });
    }

    try {
        const result = await verifyToken(token as string);

        if (!result.success) {
            res.send({ message: 'Invalid token', success: false });
        }

        if (result.data) {
            req.user = result.data as JwtPayload;
        }
        next();
    } catch (error: any) {
        logger.error('Error in auth middleware:', error);
        res.send({ message: 'Server error', success: false });
    }
};

export default authMiddleware;