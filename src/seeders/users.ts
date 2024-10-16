import { User } from "../models/user.model.ts";
import { Role } from "../models/role.model.ts";
import { logger } from "../utils/logger.ts";
import connectDB from "../db/mongoose.ts";

export const insertUsers = async () => {
    try {
        await connectDB();
        await User.deleteMany({});

        const roles = await Role.find({});

        const users = [
            { name: "Dev Shah", username: 'devsh_1702', email: "knshah9429@gmail.com", mobile: "9265399950", password: "Test@123", emailVerified: true, roles: roles.filter(role => role.name === "User").map(role => role._id) },
            { name: "Admin", username: 'admin1', email: "admin@gmail.com", mobile: "1234567890", password: "Test@123", emailVerified: true, roles: roles.filter(role => role.name === "Admin").map(role => role._id) },
            { name: "Super Admin", username: 'superadmin1', email: "superadmin@gmail.com", mobile: "1234567899", password: "Test@123", emailVerified: true, roles: roles.filter(role => role.name === "Super Admin").map(role => role._id) }
        ];

        await User.insertMany(users);
        logger.info("Users seeded successfully!");
    } catch (error) {
        logger.error("Error seeding users:", error);
        throw error;
    }
};
