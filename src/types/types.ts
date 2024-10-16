import { Types } from "mongoose";

export type Permission = {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    _id?: Types.ObjectId;
}

export type Project = {
    name: string;
    description?: string;
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
    project: Types.ObjectId;
    permissions: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
};

export type User = {
    _id?: Types.ObjectId;
    name: string;
    username: string;
    email: string;
    mobile: string;
    password: string;
    profileImage?: string;
    emailVerified: boolean;
    roles: Types.ObjectId[];
    devices: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
};