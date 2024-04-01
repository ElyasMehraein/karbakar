import * as mongoose from 'mongoose';
import { Schema } from "mongoose";
import BusinessModel from './Business';
import UserModel from './User';
import BillModel from './Bill';

const schema = new Schema({
    recepiant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    jobOffers: Boolean,
    isSeen: Boolean,
    isjobOffersAnswerd:Boolean,
    jobOfferAnswer: Boolean,
    bill:{ type: mongoose.Schema.Types.ObjectId, ref: "Bill" },

}, { timestamps: true })

const ReportModel = mongoose.models.Report || mongoose.model("Report", schema)
export default ReportModel