import { Role } from "../models/role.model.ts";
import { logger } from "../utils/logger.ts";
import connectDB from "../db/mongoose.ts";
import { Permission, Project } from "../types/types.ts";

export const insertRoles = async (permissionDocs: Permission[], projectDocs: Project[]) => {
    try {
        await connectDB();

        await Role.deleteMany({});

        const project = projectDocs.find((project: Project) => project.name === 'Auth Dev');
        if (!project) {
            throw new Error("Project 'Auth Dev' not found");
        }

        const superAdminPermissions = permissionDocs.map((permission: Permission) => permission._id);
        const adminPermissions = permissionDocs
            .filter((permission) => permission.name !== "manage_admins")
            .map((permission) => permission._id);

        const roles = [
            {
                name: "Super Admin",
                code: 'SPRADMIN',
                permissions: superAdminPermissions,
                project: project._id,
            },
            {
                name: "Admin",
                code: 'ADMIN',
                permissions: adminPermissions,
                project: project._id,
            },
            {
                name: "User",
                code: 'USR',
                permissions: [],
                project: project._id,
            },
        ];

        await Role.insertMany(roles);

        logger.info("Roles seeded successfully!");
    } catch (error) {
        logger.error("Error seeding roles:", error);
        throw error;
    }
};
