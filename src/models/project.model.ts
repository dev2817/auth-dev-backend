import { Schema, model, Document, Types } from "mongoose";
import { Project as ProjectType } from "../types/types.ts";

interface ProjectDocument extends Omit<ProjectType, '_id'>, Document {
    _id: Types.ObjectId;
}

const projectSchema = new Schema<ProjectDocument>({
    name: { type: String, required: true },
    code: {type: String, required: true, unique: true},
    description: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Project = model<ProjectDocument>("Project", projectSchema);
