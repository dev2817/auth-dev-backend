import { insertRoles } from "./roles.ts";
import { insertProjects } from "./projects.ts";
import { logger } from "../utils/logger.ts";
import { insertPermissions } from "./permissions.ts";
import { insertUsers } from "./users.ts";

export const runAllSeeders = async () => {
    const permissions = await insertPermissions()
    const projects = await insertProjects();
    await insertRoles(permissions, projects);
    await insertUsers();
    logger.info("All seeders ran successfully!");
    process.exit(0);
};

