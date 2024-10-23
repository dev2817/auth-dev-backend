import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { User as UserType } from "../types/types.ts";

interface UserDocument extends Omit<UserType, '_id'>, Document {
    _id: Types.ObjectId;
}

const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    username: { type: String, unique: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String, unique: true },
    password: { type: String },
    googleUid: { type: String },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    emailVerified: { type: Boolean, default: false },
    profileImage: { type: String },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    devices: [{ type: Schema.Types.ObjectId, ref: "Device" }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error: any) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (userPassword: string) {
    return bcrypt.compare(userPassword, this.password);
};

export const User = model<UserDocument>("User", userSchema);
