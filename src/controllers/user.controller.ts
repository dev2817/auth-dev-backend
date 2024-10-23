import { Request, Response } from "express";
import userService from "../services/user.service.ts";


const signUpUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const logInUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.logIn(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const resendOtp = async (req: Request, res: Response) => {
    try {
        const user = await userService.generateOtpForUser(req.body.name);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const forgotPasswordData = async (req: Request, res: Response) => {
    try {
        const user = await userService.forgotPassword(req.body.name);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const otpVerifyData = async (req: Request, res: Response) => {
    try {
        const user = await userService.otpVerify(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const resetPasswordData = async (req: Request, res: Response) => {
    try {
        const user = await userService.resetPassword(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.updateUserData(req.params.userId, req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserData(req.params.userId);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const checkUserData = async (req: Request, res: Response) => {
    try {
        const user = await userService.checkIfDataExists(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const signWithGoogle = async (req: Request, res: Response) => {
    try {
        const user = await userService.signInWithGoogle(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const completeProfileData = async (req: Request, res: Response) => {
    try {
        const user = await userService.completeProfile(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const userController = {
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
