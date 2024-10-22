import * as mongoose from 'mongoose';
import { Schema } from "mongoose";
import BusinessModel from './Business';
import UserModel from './User';
import BillModel from './Bill';

const schema = new Schema({
    requestsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
    requestsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    requestedAt: { type: Date, default: Date.now },
    approvedAt: Date

}, { timestamps: true })

const BusinessRelationModel = mongoose.models.BusinessRelation || mongoose.model("BusinessRelation", schema)
export default BusinessRelationModel