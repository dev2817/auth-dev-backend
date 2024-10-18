import { Role, User, Project, Permission } from "../models/index.ts"
import { logger } from "../utils/logger.ts";

export const getAllUsersSuper = async () => {
    try {
        const users = await User.find({ isActive: true });
        return { data: users, message: "Got all the users successfully!", success: true };
    }
    catch (err: any) {
        logger.error("Error getting users:", err);
        return { message: `Error getting users`, success: false };
    }
}

export const getRolesSuper = async () => {
    try {
        const roles = await Role.find({
            isActive: true,
        })
            .populate('project')
            .populate('permissions');

        return { data: roles, message: "Got all roles successfully", success: true };

    } catch (err: any) {
        logger.error("Error getting roles:", err);
        return { message: "Error getting roles", success: false };
    }
};

export const getProjectsSuper = async () => {
    try {
        const projects = await Project.find({ isActive: true });
        return { data: projects, message: "Got all projects successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error getting projects:", err);
        return { message: `Error getting projects`, success: false };
    }
}

export const getPermissionsSuper = async () => {
    try {
        const permissions = await Permission.find({ isActive: true });
        return { data: permissions, message: "Got all permissions successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error getting permissions:", err);
        return { message: `Error getting permissions`, success: false };
    }
}