import * as mongoose from 'mongoose';
import { Schema, Document } from "mongoose";
import BusinessModel from './Business';
import GuildModel from "./Guild";
import UserModel from './User';

export interface IBusinessRelation extends Document {
  provider: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  isAnswerNeed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  isAnswerNeed: Boolean,
}, { timestamps: true });

const BusinessRelationModel = mongoose.models.BusinessRelation || mongoose.model<IBusinessRelation>("BusinessRelation", schema);
export default BusinessRelationModel; 