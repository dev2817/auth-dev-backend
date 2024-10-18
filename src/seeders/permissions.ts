import { Permission } from "../models/index.ts";
import { logger } from "../utils/logger.ts";
import { permissions } from "./constants.ts";
import connectDB from "../db/mongoose.ts";

export const insertPermissions = async () => {
    try {
        await connectDB();
        await Permission.deleteMany({});
        const permissionDocs = await Permission.insertMany(permissions);
        logger.info("Permissions seeded successfully!");
        return permissionDocs;
    } catch (error) {
        logger.error("Error seeding permissions:", error);
        throw error;
    }
};
