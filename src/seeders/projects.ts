import connectDB from "../db/mongoose.ts";
import { Project } from "../models/index.ts";
import { logger } from "../utils/logger.ts";
import { projects } from "./constants.ts";

export const insertProjects = async () => {
    try {
        await connectDB();
        await Project.deleteMany({});
        const projectDocs = await Project.insertMany(projects);
        logger.info("Projects seeded successfully!", projectDocs);
        return projectDocs
    } catch (error) {
        logger.error("Error seeding projects:", error);
        throw error;
    }
};
