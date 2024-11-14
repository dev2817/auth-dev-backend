import { Request, Response } from "express";
import userService from "../services/user.service.ts";
import { verifyToken } from "../utils/token.ts";
import { logger } from "../utils/logger.ts";

const checkToken = async (req: Request, res: Response) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];

    if (!token) {
        res.send({ message: 'No token provided, authorization denied', success: false });
        return;
    }

    try {
        const result = await verifyToken(token as string);

        if (!result.success) {
            res.send({ message: 'Invalid token', success: false });
            return;
        }

        res.send({ message: "User Verified", success: true });
    } catch (err: any) {
        logger.error('Error in auth middleware:', err);
        res.send({ message: 'Internal Server error', success: false });
    }
};


const signUpUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const logInUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.logIn(req.body);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const resendOtp = async (req: Request, res: Response) => {
    try {
        const user = await userService.generateOtpForUser(req.body.name);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const forgotPasswordData = async (req: Request, res: Response) => {
    try {
        const user = await userService.forgotPassword(req.body.name);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const otpVerifyData = async (req: Request, res: Response) => {
    try {
        const user = await userService.otpVerify(req.body);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const resetPasswordData = async (req: Request, res: Response) => {
    try {
        const user = await userService.resetPassword(req.body);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.updateUserData(req.params.userId, req.body);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserData(req.params.userId);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const checkUserData = async (req: Request, res: Response) => {
    try {
        const user = await userService.checkIfDataExists(req.body);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const signWithGoogle = async (req: Request, res: Response) => {
    try {
        const user = await userService.signInWithGoogle(req.body);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const completeProfileData = async (req: Request, res: Response) => {
    try {
        const user = await userService.completeProfile(req.body);
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const userController = {
    checkToken,
    signUpUser,
    updateUser,
    checkUserData,
    getUserById,
    logInUser,
    resendOtp,
    forgotPasswordData,
    resetPasswordData,
    otpVerifyData,
    signWithGoogle,
    completeProfileData,
}

export default userController;
