import * as mongoose from 'mongoose';
import { Schema } from "mongoose";
import BusinessModel from './Business';
import UserModel from './User';
import BillModel from './Bill';

const schema = new Schema({
    recepiant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, maxlength: 15, },
    message: { type: String, maxlength: 40, },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    bill: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" },
    isSeen: Boolean,
    isAnswerNeed: Boolean,
    Answer: Boolean,

}, { timestamps: true })

const ReportModel = mongoose.models.Report || mongoose.model("Report", schema)
export default ReportModel