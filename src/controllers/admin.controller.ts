import { Request, Response } from "express";
import { createPermission, createProject, createRole, deletePermission, deleteProject, deleteRole, getAllUsers, getPermissionById, getPermissionByIds, getPermissions, getProjectById, getProjectByIds, getProjects, getRoleById, getRoleByIds, getRoles, updatePermission, updateProject, updateRole } from "../services/admin.service.ts";

//admin controllers

export const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await getAllUsers();
        res.send(user);
    }
    catch (err: any) {
        throw err;
    }
}



//project controllers

export const addProject = async (req: Request, res: Response) => {
    try {
        const project = await createProject(req.body);
        res.send(project);
    }
    catch (err: any) {
        throw err;
    }
}

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await getProjects();
        res.send(projects);
    }
    catch (err: any) {
        throw err;
    }
}

export const getProjectDataById = async (req: Request, res: Response) => {
    try {
        const project = await getProjectById(req.params.projectId);
        res.send(project);
    }
    catch (err: any) {
        throw err;
    }
}

export const getProjectDataByIds = async (req: Request, res: Response) => {
    try {
        const projects = await getProjectByIds(req.body.projectIds);
        res.send(projects);
    }
    catch (err: any) {
        throw err;
    }
}

export const updateProjectData = async (req: Request, res: Response) => {
    try {
        const project = await updateProject(req.params.projectId, req.body);
        res.send(project);
    }
    catch (err: any) {
        throw err;
    }
}

export const deleteProjectData = async (req: Request, res: Response) => {
    try {
        const projects = await deleteProject(req.params.projectId);
        res.send(projects);
    }
    catch (err: any) {
        throw err;
    }
}



//permission controllers

export const addPermission = async (req: Request, res: Response) => {
    try {
        const permission = await createPermission(req.body);
        res.send(permission);
    }
    catch (err: any) {
        throw err;
    }
}

export const getAllPermissions = async (req: Request, res: Response) => {
    try {
        const permissions = await getPermissions();
        res.send(permissions);
    }
    catch (err: any) {
        throw err;
    }
}

export const getPermissionDataById = async (req: Request, res: Response) => {
    try {
        const permission = await getPermissionById(req.params.permissionId);
        res.send(permission);
    }
    catch (err: any) {
        throw err;
    }
}

export const getPermissionDataByIds = async (req: Request, res: Response) => {
    try {
        const permissions = await getPermissionByIds(req.body.permissionIds);
        res.send(permissions);
    }
    catch (err: any) {
        throw err;
    }
}

export const updatePermissionData = async (req: Request, res: Response) => {
    try {
        const permission = await updatePermission(req.params.permissionId, req.body);
        res.send(permission);
    }
    catch (err: any) {
        throw err;
    }
}

export const deletePermissionData = async (req: Request, res: Response) => {
    try {
        const permission = await deletePermission(req.params.permissionId);
        res.send(permission);
    }
    catch (err: any) {
        throw err;
    }
}


// roles controller

export const addRole = async (req: Request, res: Response) => {
    try {
        const role = await createRole(req.body);
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const role = await getRoles();
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}

export const getRoleByIdData = async (req: Request, res: Response) => {
    try {
        const role = await getRoleById(req.params.roleId);
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}

export const getRolesByIdsData = async (req: Request, res: Response) => {
    try {
        const role = await getRoleByIds(req.body.roleIds);
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}

export const updateRoleData = async (req: Request, res: Response) => {
    try {
        const role = await updateRole(req.params.roleId, req.body);
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}

export const deleteRoleData = async (req: Request, res: Response) => {
    try {
        const role = await deleteRole(req.params.roleId);
        res.send(role);
    }
    catch (err: any) {
        throw err;
    }
}