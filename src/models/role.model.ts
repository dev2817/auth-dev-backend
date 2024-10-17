import { Schema, model, Document, Types } from "mongoose";
import { Role as RoleType } from "../types/types.ts";

interface RoleDocument extends Omit<RoleType, '_id'>, Document {
    _id: Types.ObjectId;
}

const roleSchema = new Schema<RoleDocument>({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Role = model<RoleDocument>("Role", roleSchema);
