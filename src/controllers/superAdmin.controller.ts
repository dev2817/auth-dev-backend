import { Request, Response } from "express";
import superAdminService from "../services/superAdmin.service.ts";

const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await superAdminService.getAllUsersSuper();
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}

const getAllRoles = async (req: Request, res: Response) => {
    try {
        const role = await superAdminService.getRolesSuper();
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}

const getAllProjects = async (req: Request, res: Response) => {
    try {
        const role = await superAdminService.getProjectsSuper();
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}

const getAllPermissions = async (req: Request, res: Response) => {
    try {
        const role = await superAdminService.getPermissionsSuper();
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}

const superAdminController = {
    getAllPermissions,
    getAllProjects,
    getAllRoles,
    getUsers
}

export default superAdminController;
