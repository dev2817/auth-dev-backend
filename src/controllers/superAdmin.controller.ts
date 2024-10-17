import { Request, Response } from "express";
import { getAllUsersSuper, getPermissionsSuper, getProjectsSuper, getRolesSuper } from "../services/superAdmin.service.ts";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await getAllUsersSuper();
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const role = await getRolesSuper();
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const role = await getProjectsSuper();
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}

export const getAllPermissions = async (req: Request, res: Response) => {
    try {
        const role = await getPermissionsSuper();
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}