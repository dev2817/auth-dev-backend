import { Request, Response } from "express";
import adminService from "../services/admin.service.ts";

//admin controllers

const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await adminService.getAllUsers();
        res.send(user);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

//project controllers

const addProject = async (req: Request, res: Response) => {
    try {
        const project = await adminService.createProject(req.body);
        res.send(project);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await adminService.getProjects();
        res.send(projects);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getProjectDataById = async (req: Request, res: Response) => {
    try {
        const project = await adminService.getProjectById(req.params.projectId);
        res.send(project);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getProjectDataByIds = async (req: Request, res: Response) => {
    try {
        const projects = await adminService.getProjectByIds(req.body.projectIds);
        res.send(projects);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const updateProjectData = async (req: Request, res: Response) => {
    try {
        const project = await adminService.updateProject(req.params.projectId, req.body);
        res.send(project);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const deleteProjectData = async (req: Request, res: Response) => {
    try {
        const projects = await adminService.deleteProject(req.params.projectId);
        res.send(projects);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}



//permission controllers

const addPermission = async (req: Request, res: Response) => {
    try {
        const permission = await adminService.createPermission(req.body);
        res.send(permission);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getAllPermissions = async (req: Request, res: Response) => {
    try {
        const permissions = await adminService.getPermissions();
        res.send(permissions);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getPermissionDataById = async (req: Request, res: Response) => {
    try {
        const permission = await adminService.getPermissionById(req.params.permissionId);
        res.send(permission);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getPermissionDataByIds = async (req: Request, res: Response) => {
    try {
        const permissions = await adminService.getPermissionByIds(req.body.permissionIds);
        res.send(permissions);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const updatePermissionData = async (req: Request, res: Response) => {
    try {
        const permission = await adminService.updatePermission(req.params.permissionId, req.body);
        res.send(permission);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const deletePermissionData = async (req: Request, res: Response) => {
    try {
        const permission = await adminService.deletePermission(req.params.permissionId);
        res.send(permission);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}


// roles controller

const addRole = async (req: Request, res: Response) => {
    try {
        const role = await adminService.createRole(req.body);
        res.send(role);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getAllRoles = async (req: Request, res: Response) => {
    try {
        const role = await adminService.getRoles();
        res.send(role);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getRoleByIdData = async (req: Request, res: Response) => {
    try {
        const role = await adminService.getRoleById(req.params.roleId);
        res.send(role);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const getRolesByIdsData = async (req: Request, res: Response) => {
    try {
        const role = await adminService.getRoleByIds(req.body.roleIds);
        res.send(role);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const updateRoleData = async (req: Request, res: Response) => {
    try {
        const role = await adminService.updateRole(req.params.roleId, req.body);
        res.send(role);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const deleteRoleData = async (req: Request, res: Response) => {
    try {
        const role = await adminService.deleteRole(req.params.roleId);
        res.send(role);
        return;
    }
    catch (err: any) {
        res.send({ message: 'Internal Server error', success: false });
    }
}

const adminController = {
    getUsers,
    addProject,
    getAllProjects,
    getProjectDataById,
    getProjectDataByIds,
    updateProjectData,
    deleteProjectData,
    addPermission,
    getAllPermissions,
    getAllRoles,
    getRoleByIdData,
    getRolesByIdsData,
    updateRoleData,
    deleteRoleData,
    getPermissionDataByIds,
    updatePermissionData,
    deletePermissionData,
    addRole,
    getPermissionDataById,
}

export default adminController;
