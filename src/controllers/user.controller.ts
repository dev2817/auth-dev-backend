import { Request, Response } from "express";
import { createUser, updateUserData } from "../services/user.service.ts";

export const signUpUser = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
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