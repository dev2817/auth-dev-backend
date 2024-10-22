import { User, Role } from "../models/index.ts";
import { logger } from "../utils/logger.ts";
import connectDB from "../db/mongoose.ts";

export const insertUsers = async () => {
    try {
        await connectDB();
        await User.deleteMany({});

        const roles = await Role.find({});

        const users = [
            { name: "Dev Shah", username: 'devsh_1702', email: "knshah9429@gmail.com", mobile: "9265399950", password: "$2a$10$980eApNFPIRm97VszA3hSOZgsbVgbrSDNOFO2/CBAnL.RUBcQBKW6", emailVerified: true, roles: roles.filter(role => role.code === "USR").map(role => role._id) },
            { name: "Admin", username: 'admin1', email: "admin@gmail.com", mobile: "1234567890", password: "$2a$10$980eApNFPIRm97VszA3hSOZgsbVgbrSDNOFO2/CBAnL.RUBcQBKW6", emailVerified: true, roles: roles.filter(role => role.code === "ADMIN").map(role => role._id) },
            { name: "Super Admin", username: 'superadmin1', email: "superadmin@gmail.com", mobile: "1234567899", password: "$2a$10$980eApNFPIRm97VszA3hSOZgsbVgbrSDNOFO2/CBAnL.RUBcQBKW6", emailVerified: true, roles: roles.filter(role => role.code === "SPRADMIN").map(role => role._id) }
        ];

        await User.insertMany(users);
        logger.info("Users seeded successfully!");
    } catch (error) {
        logger.error("Error seeding users:", error);
        throw error;
    }
};
