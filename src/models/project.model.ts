import { Schema, model, Document, Types } from "mongoose";
import { Project as ProjectType } from "../types/types.ts";

interface ProjectDocument extends Omit<ProjectType, '_id'>, Document {
    _id: Types.ObjectId;
}

const projectSchema = new Schema<ProjectDocument>({
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Project = model<ProjectDocument>("Project", projectSchema);