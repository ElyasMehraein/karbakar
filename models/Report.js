import * as mongoose from 'mongoose';
import { Schema } from "mongoose";
import BusinessModel from './Business';
import UserModel from './User';
import BillModel from './Bill';
import BusinessRelationModel from './BusinessRelation';

const schema = new Schema({
    recepiant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, maxlength: 20, required: true },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    bill: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" },
    businessRelation: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessRelation" },
    providerBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    receiverBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    isSeen: Boolean,
    isAnswerNeed: Boolean,
    answer: Boolean,

}, { timestamps: true })

const ReportModel = mongoose.models.Report || mongoose.model("Report", schema)
export default ReportModel