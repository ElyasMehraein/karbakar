import * as mongoose from 'mongoose';
import { Schema } from "mongoose";
import BusinessModel from './Business';
import GuildModel from "./Guild";
import UserModel from './User';

const schema = new Schema({
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    isAnswerNeed: Boolean,
}, { timestamps: true })

const BusinessRelationModel = mongoose.models.BusinessRelation || mongoose.model("BusinessRelation", schema)
export default BusinessRelationModel