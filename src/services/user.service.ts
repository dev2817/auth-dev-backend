import { User } from "../models/user.model.ts";
import { logger } from "../utils/logger.ts";
import { CreateUserInput } from "./types/types.ts";

export const createUser = async (userData: CreateUserInput) => {
    try {
        const newUser = new User({
            ...userData,
        });
        const savedUser = await newUser.save();
        logger.info("User created successfully:", savedUser);
        return { message: "User saved successfully!", success: true, data: savedUser };
    } catch (error: any) {
        logger.error("Error creating user:", error);
        throw new Error(`Error creating user: ${error.message}`);
    }
};