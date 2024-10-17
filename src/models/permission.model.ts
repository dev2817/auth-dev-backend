import { Schema, model, Document, Types } from "mongoose";
import { Permission as PermissionType } from "../types/types.ts";

interface PermissionDocument extends Omit<PermissionType, '_id'>, Document {
    _id: Types.ObjectId;
}

const permissionSchema = new Schema<PermissionDocument>({
    name: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Permission = model<PermissionDocument>("Permission", permissionSchema);
