import { Role } from "../models/role.model.ts";
import { User } from "../models/user.model.ts";
import { logger } from "../utils/logger.ts";
import { CreateUserInput, UpdateUserInput } from "./types/types.ts";

export const createUser = async (userData: CreateUserInput) => {
    try {
        if (!userData.roles || userData.roles.length === 0) {
            const userRole = await Role.findOne({ name: "User", isActive: true });
            if (!userRole) {
                throw new Error("Default 'User' role not found. Please check the roles collection.");
            }
            userData.roles = [userRole._id.toString()];
        }

        const newUser = new User({
            ...userData,
        });

        const savedUser = await newUser.save();

        logger.info("User created successfully:", savedUser);
        return { message: "User saved successfully!", success: true, data: savedUser };
    } catch (err: any) {
        logger.error("Error creating user:", err);
        return { message: `Error creating user`, success: false };
    }
};

export const updateUserData = async (userId: string, userData: UpdateUserInput) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: userData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error(`User with ID ${userId} not found`);
        }

        logger.info("User updated successfully:", updatedUser);
        return { message: "User updated successfully!", success: true, data: updatedUser };
    } catch (err: any) {
        logger.error("Error updating user:", err);
        return { message: `Error updating user`, success: false };
    }
};