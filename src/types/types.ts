import { Types } from "mongoose";

export type Permission = {
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _id?: Types.ObjectId;
}

export type Project = {
    name: string;
    code: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _id?: Types.ObjectId;
}

export type Device = {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    ip: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Role = {
    _id?: Types.ObjectId;
    name: string;
    code: string;
    description?: string;
    project: Types.ObjectId;
    permissions: Types.ObjectId[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type User = {
    _id?: Types.ObjectId;
    name: string;
    username: string;
    email: string;
    googleUid?: string;
    mobile: string;
    password: string;
    profileImage?: string;
    emailVerified: boolean;
    otp: string;
    otpExpiresAt: Date;
    roles: Types.ObjectId[];
    devices: Types.ObjectId[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type JwtPayload = {
    userId: string;
    roleId: string;
    ip: string;
}