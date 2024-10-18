import { Request, Response } from "express";
import { createUser, forgotPassword, generateOtpForUser, getUserData, logIn, otpVerify, resetPassword, updateUserData } from "../services/user.service.ts";

export const signUpUser = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

export const logInUser = async (req: Request, res: Response) => {
    try {
        const user = await logIn(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

export const resendOtp = async (req: Request, res: Response) => {
    try {
        const user = await generateOtpForUser(req.body.name);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

export const forgotPasswordData = async (req: Request, res: Response) => {
    try {
        const user = await forgotPassword(req.body.name);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

export const otpVerifyData = async (req: Request, res: Response) => {
    try {
        const user = await otpVerify(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

export const resetPasswordData = async (req: Request, res: Response) => {
    try {
        const user = await resetPassword(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await updateUserData(req.params.userId, req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await getUserData(req.params.userId);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

