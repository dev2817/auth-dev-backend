import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { LogInInput } from "../types/types.ts";
import { logger } from "../utils/logger.ts";
import { generateJwtToken } from "../utils/token.ts";
import { CreateUserInput, OtpInput, ResetPasswordInput, UpdateUserInput } from "./types/types.ts";
import { Device, Role, User } from "../models/index.ts"

export const generateOtpForUser = async (email: string) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return { message: "User not found", success: false };
        }

        const otp = crypto.randomInt(100000, 999999).toString();

        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        return { message: "OTP generated successfully", success: true, otp };
    } catch (error: any) {
        console.error("Error generating OTP:", error);
        return { message: "Error generating OTP", success: false };
    }
};

export const createUser = async (userData: CreateUserInput) => {
    try {
        let existingUser = await User.findOne({
            $or: [{ username: userData.username }, { email: userData.email }],
        }).populate('roles');

        if (!existingUser) {
            if (!userData.projectId) {
                const defaultRole = await Role.findOne({ code: "USR", isActive: true });
                if (!defaultRole) {
                    return { message: "Default 'USR' role not found. Please check the roles collection.", success: false };
                }
                userData.roles = [defaultRole._id.toString()];
            } else {
                if (!userData.roles) {
                    return { message: "Project role is required when a project ID is provided.", success: false };
                }

                const projectRole = await Role.findOne({ code: userData.roles, project: userData.projectId });
                if (!projectRole) {
                    return { message: `Role with code '${userData.roles}' not found for the given project.`, success: false };
                }

                userData.roles = [projectRole._id.toString()];
            }

            const newUser = await User.create({
                ...userData,
            });

            if (!newUser.emailVerified) {
                await generateOtpForUser(newUser.email);
                return { message: "Please verify your email!", success: false, verify: false };
            }

            logger.info("User created successfully:", newUser);
            return { message: "User created successfully!", success: true, data: newUser };
        } else {
            if (userData.projectId && userData.roles) {
                const projectRole = await Role.findOne({ code: userData.roles, project: userData.projectId });
                if (!projectRole) {
                    return { message: `Role with code '${userData.roles}' not found for the given project.`, success: false };
                }

                const isRoleAssigned = existingUser.roles.some((role: any) => role._id.equals(projectRole._id));
                if (!isRoleAssigned) {
                    existingUser.roles.push(projectRole._id);
                    await existingUser.save();
                    logger.info("User updated with new role:", existingUser);
                    return { message: "User updated with new role successfully!", success: true, data: existingUser };
                }
            }

            if (!existingUser.emailVerified) {
                await generateOtpForUser(existingUser.email);
                return { message: "Please verify your email!", success: false, verify: false };
            }

            return { message: "User already exists with the provided details.", success: true, data: existingUser };
        }
    } catch (err: any) {
        logger.error("Error creating/updating user:", err);
        return { message: "Error creating/updating user", success: false };
    }
};


export const logIn = async (loginData: LogInInput) => {
    try {
        const user = await User.findOne({
            $or: [{ username: loginData.name }, { email: loginData.name }],
        }).populate('roles');

        if (!user) {
            return { message: "User not found. Please sign up.", success: false };
        }

        const projectRole = await Role.findOne({
            _id: { $in: user.roles },
            project: loginData.projectId,
        });

        if (!projectRole) {
            return { message: "User not associated with this project role. Please sign up.", success: false };
        }

        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
        if (!isPasswordValid) {
            return { message: "Invalid password.", success: false };
        }

        if (!user.emailVerified) {
            await generateOtpForUser(user.email)
            return { message: "Please verify your email!", success: false, verify: false };
        }

        let device = await Device.findOne({ user: user._id, ip: loginData.ip });

        const generatedToken = await generateJwtToken({
            userId: user._id.toString(),
            roleId: projectRole._id.toString(),
            ip: loginData.ip,
        });

        if (device) {
            device.token = generatedToken.data as string;
            await device.save();
        } else {
            device = await Device.create({
                user: user._id,
                ip: loginData.ip,
                token: generatedToken.data,
            });
        }

        return {
            message: "Login successful",
            success: true,
            token: generatedToken.data,
        };
    } catch (err: any) {
        logger.error("Error logging in:", err);
        return { message: "Error logging in", success: false };
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

export const forgotPassword = async (name: string) => {
    try {
        const user = await User.findOne({
            $or: [{ username: name }, { email: name }],
        }).populate('roles');

        if (!user) {
            return { message: "User not found. Please sign up.", success: false };
        }

        await generateOtpForUser(user.email);
        return { message: "Please check your email for otp!", success: false, forgotPassword: false };
    }
    catch (err: any) {
        logger.error("Error resetting password:", err);
        return { message: `Error resetting password`, success: false };
    }
}

export const otpVerify = async (otpData: OtpInput) => {
    try {
        const user = await User.findOne({
            $or: [{ username: otpData.name }, { email: otpData.name }],
        });

        if (!user) {
            return { message: "User not found. Please sign up.", success: false };
        }

        if (!user.otp || !user.otpExpiresAt || user.otp !== otpData.otp) {
            return { message: "Invalid OTP.", success: false };
        }

        const currentTime = new Date();
        if (user.otpExpiresAt < currentTime) {
            return { message: "OTP has expired. Please request a new one.", success: false };
        }

        if (otpData.verify) {
            user.emailVerified = true;
            await user.save();
            return { message: "Email verified successfully.", success: true, verify: true };
        }

        if (otpData.forgotPassword) {
            return { message: "OTP verified successfully for password reset.", success: true, verify: false };
        }

        return { message: "OTP verified successfully.", success: true, verify: false };
    } catch (err: any) {
        logger.error("Error verifying user:", err);
        return { message: `Error verifying user.`, success: false };
    }
};

export const resetPassword = async (resetPasswordData: ResetPasswordInput) => {
    try {
        const user = await User.findOne({
            $or: [{ username: resetPasswordData.name }, { email: resetPasswordData.name }],
        });

        if (!user) {
            return { message: "User not found. Please sign up.", success: false };
        }

        await User.findOneAndUpdate(
            { _id: user.id },
            { password: resetPasswordData.password },
            { new: true }
        );
        return { message: "Password reset successful, please login!", success: true }
    }
    catch (err: any) {
        logger.error("Error resetting password:", err);
        return { message: `Error resetting password.`, success: false };
    }
}