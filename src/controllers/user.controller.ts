import { Request, Response } from "express";
import { createUser } from "../services/user.service.ts";

export const signUpUser = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}