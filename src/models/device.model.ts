import { Schema, model, Document, Types } from "mongoose";
import { Device as DeviceType } from "../types/types.ts";

interface DeviceDocument extends Omit<DeviceType, '_id'>, Document {
    _id: Types.ObjectId;
}

const deviceSchema = new Schema<DeviceDocument>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ip: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Device = model<DeviceDocument>("Device", deviceSchema);
