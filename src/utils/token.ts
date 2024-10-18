import jwt from 'jsonwebtoken'
import { logger } from './logger.ts';
import { JwtPayload } from '../types/types.ts';

const jwtSecret = process.env.JWT_SECRET as string

export const generateJwtToken = async (payload: JwtPayload) => {
    try {
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
        return { data: token, success: true, message: "Token generated successfully" }
    }
    catch (err: any) {
        logger.error("Error generating token:", err);
        return { message: `Error generating token`, success: false };
    }
}

export const verifyToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        if (decoded) {
            return { data: decoded, success: true, message: "Token verified successfully" }
        }
        return { success: false, message: "Error verifying token" }
    }
    catch (err: any) {
        logger.error("Error verifying token:", err);
        return { message: `Error verifying token`, success: false };
    }
}