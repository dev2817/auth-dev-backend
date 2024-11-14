import { Request, Response } from "express";
import superAdminService from "../services/superAdmin.service.ts";

const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await superAdminService.getAllUsersSuper();
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getAllRoles = async (req: Request, res: Response) => {
    try {
        const role = await superAdminService.getRolesSuper();
        res.send(role);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getAllProjects = async (req: Request, res: Response) => {
    try {
        const role = await superAdminService.getProjectsSuper();
        res.send(role);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getAllPermissions = async (req: Request, res: Response) => {
    try {
        const role = await superAdminService.getPermissionsSuper();
        res.send(role);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const superAdminController = {
    getAllPermissions,
    getAllProjects,
    getAllRoles,
    getUsers
}

export default superAdminController;
