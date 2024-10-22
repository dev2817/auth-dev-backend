import { logger } from "../utils/logger.ts";
import { Permission, Project, Role, User } from "../models/index.ts"
import { PermissionInput, ProjectInput, RoleInput, UpdatePermissionInput, UpdateProjectInput, UpdateRoleInput } from "./types/types.ts";

// admin services

const getAllUsers = async () => {
    try {
        const adminRoles = await Role.find({ name: { $in: ["Admin", "Super Admin"] }, isActive: true });

        const adminRoleIds = adminRoles.map(role => role._id);

        const users = await User.find({ roles: { $nin: adminRoleIds }, isActive: true });

        return { data: users, message: "Got all the users successfully!", success: true };
    } catch (err: any) {
        logger.error("Error getting users:", err);
        return { message: `Error getting users`, success: false };
    }
};



//project services

const createProject = async (projectData: ProjectInput) => {
    try {
        const project = await Project.create(projectData);
        return { data: project, message: "Project created successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error creating project:", err);
        return { message: `Error creating project`, success: false };
    }
}

const getProjects = async () => {
    try {
        const projects = await Project.find({
            name: { $nin: ['Auth Dev'] },
            isActive: true
        });
        return { data: projects, message: "Got all projects successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error getting projects:", err);
        return { message: `Error getting projects`, success: false };
    }
}

const getProjectById = async (projectId: string) => {
    try {
        const projects = await Project.findById(projectId);
        return { data: projects, message: "Got project successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error getting project:", err);
        return { message: `Error getting project`, success: false };
    }
}

const getProjectByIds = async (projectIds: string[]) => {
    try {
        const projects = await Project.find({
            _id: { $in: projectIds },
            isActive: true
        });
        return { data: projects, message: "Got projects successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error getting projects:", err);
        return { message: `Error getting projects`, success: false };
    }
}

const updateProject = async (projectId: string, projectData: UpdateProjectInput) => {
    try {
        const project = await Project.findByIdAndUpdate(projectId,
            { $set: projectData },
            { new: true, runValidators: true });
        return { data: project, message: "Project updated successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error updating project:", err);
        return { message: `Error updating project`, success: false };
    }
}

const deleteProject = async (projectId: string) => {
    try {
        const project = await Project.findByIdAndUpdate(projectId,
            { $set: { isActive: false } },
            { new: true, runValidators: true });
        return { data: project, message: "Project deleted successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error deleting project:", err);
        return { message: `Error deleting project`, success: false };
    }
}




// permission services

const createPermission = async (permissionData: PermissionInput) => {
    try {
        const permission = await Permission.create(permissionData);
        return { data: permission, message: "Permission created successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error creating permission:", err);
        return { message: `Error creating permission`, success: false };
    }
}

const getPermissions = async () => {
    try {
        const permissions = await Permission.find({
            name: { $nin: ['manage_admins'] },
            isActive: true
        });
        return { data: permissions, message: "Got all permissions successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error getting permissions:", err);
        return { message: `Error getting permissions`, success: false };
    }
}

const getPermissionById = async (permissionId: string) => {
    try {
        const permission = await Permission.findById(permissionId);
        return { data: permission, message: "Got permission successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error getting permission:", err);
        return { message: `Error getting permission`, success: false };
    }
}

const getPermissionByIds = async (permissionIds: string[]) => {
    try {
        const permissions = await Permission.find({
            _id: { $in: permissionIds },
            isActive: true
        });
        return { data: permissions, message: "Got permissions successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error getting permissions:", err);
        return { message: `Error getting permissions`, success: false };
    }
}

const updatePermission = async (permissionId: string, permissionData: UpdatePermissionInput) => {
    try {
        const permission = await Permission.findByIdAndUpdate(permissionId,
            { $set: permissionData },
            { new: true, runValidators: true });
        return { data: permission, message: "Permission updated successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error updating Permission:", err);
        return { message: `Error updating Permission`, success: false };
    }
}

const deletePermission = async (permissionId: string) => {
    try {
        const permission = await Permission.findByIdAndUpdate(permissionId,
            { $set: { isActive: false } },
            { new: true, runValidators: true });
        return { data: permission, message: "Permission deleted successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error deleting Permission:", err);
        return { message: `Error deleting Permission`, success: false };
    }
}



// role services

const createRole = async (roleData: RoleInput) => {
    try {
        const projectResponse = await getProjectById(roleData.project);
        if (!projectResponse.success || !projectResponse.data) {
            return { message: "Invalid project ID", success: false };
        }

        const permissionResponse = await getPermissionByIds(roleData.permissions);
        if (!permissionResponse.success || !permissionResponse.data || permissionResponse.data.length !== roleData.permissions.length) {
            return { message: "Some permissions are invalid or inactive", success: false };
        }

        const newRole = await Role.create({
            name: roleData.name,
            code: roleData.code,
            project: roleData.project,
            permissions: permissionResponse.data.map((permission: any) => permission._id),
            isActive: true,
        });

        return { data: newRole, message: "Role created successfully", success: true };
    } catch (err: any) {
        logger.error("Error creating role:", err);
        return { message: "Error creating role", success: false };
    }
};

const getRoles = async () => {
    try {
        const roles = await Role.find({
            isActive: true,
            code: { $nin: ['SPRADMIN', 'ADMIN'] }
        })
            .populate('project')
            .populate('permissions');

        return { data: roles, message: "Got all roles successfully", success: true };

    } catch (err: any) {
        logger.error("Error getting roles:", err);
        return { message: "Error getting roles", success: false };
    }
};

const getRoleById = async (roleId: string) => {
    try {
        const role = await Role.findById(roleId)
            .populate('project')
            .populate('permissions');

        return { data: role, message: "Got role successfully", success: true };

    } catch (err: any) {
        logger.error("Error getting role:", err);
        return { message: "Error getting role", success: false };
    }
};

const getRoleByIds = async (roleIds: string[]) => {
    try {
        const roles = await Role.find({
            _id: { $in: roleIds },
            isActive: true
        })
            .populate('project')
            .populate('permissions');

        return { data: roles, message: "Got roles successfully", success: true };

    } catch (err: any) {
        logger.error("Error getting roles:", err);
        return { message: "Error getting roles", success: false };
    }
};

const updateRole = async (roleId: string, roleData: UpdateRoleInput) => {
    try {
        const projectResponse = await getProjectById(roleData.project);
        if (!projectResponse.success || !projectResponse.data) {
            return { message: "Invalid project ID", success: false };
        }

        const permissionResponse = await getPermissionByIds(roleData.permissions || []);
        if (!permissionResponse.success || !permissionResponse.data || permissionResponse.data.length !== (roleData.permissions || []).length) {
            return { message: "Some permissions are invalid or inactive", success: false };
        }

        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            {
                name: roleData.name,
                code: roleData.code,
                project: roleData.project,
                permissions: permissionResponse.data.map((permission: any) => permission._id),
                isActive: roleData.isActive !== undefined ? roleData.isActive : true,
            },
            { new: true }
        );

        if (!updatedRole) {
            return { message: "Role not found or update failed", success: false };
        }

        return { data: updatedRole, message: "Role updated successfully", success: true };
    } catch (err: any) {
        logger.error("Error updating role:", err);
        return { message: "Error updating role", success: false };
    }
};

const deleteRole = async (roleId: string) => {
    try {
        const role = await Role.findByIdAndUpdate(roleId,
            { $set: { isActive: false } },
            { new: true, runValidators: true });
        return { data: role, message: "Role deleted successfully", success: true }
    }
    catch (err: any) {
        logger.error("Error deleting Role:", err);
        return { message: `Error deleting Role`, success: false };
    }
}

const adminService = {
    getAllUsers,
    createProject,
    getRoleById,
    updateRole,
    getProjects,
    deleteRole,
    getRoles,
    getPermissionByIds,
    getProjectById,
    getRoleByIds,
    updatePermission,
    deletePermission,
    getPermissionById,
    createPermission,
    createRole,
    getPermissions,
    getProjectByIds,
    deleteProject,
    updateProject,
}

export default adminService;
