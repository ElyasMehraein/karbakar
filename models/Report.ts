import * as mongoose from 'mongoose';
import { Schema, Document, Model, Types } from "mongoose";
import BusinessModel from './Business';
import UserModel from './User';
import BillModel from './Bill';
import BusinessRelationModel from './BusinessRelation';
import { IUser } from './User';
import { IBusiness } from './Business';
import { IBill } from './Bill';
import { IBusinessRelation } from './BusinessRelation';
import { IProduct } from './Product';

interface IReportProduct {
  product: Types.ObjectId | IProduct;
  amount: number;
}

export interface IReport extends Document {
  recepiant: Types.ObjectId | IUser;
  title: string;
  business?: Types.ObjectId | IBusiness;
  bill?: Types.ObjectId | IBill;
  products: IReportProduct[];
  businessRelation?: Types.ObjectId | IBusinessRelation;
  providerBusiness?: Types.ObjectId | IBusiness;
  receiverBusiness?: Types.ObjectId | IBusiness;
  isSeen: boolean;
  isAnswerNeed?: boolean;
  answer?: boolean;
}

const schema = new Schema({
  recepiant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, maxlength: 20, required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  bill: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      amount: { type: Number, min: 1, max: 9999, required: true },
    }
  ],
  businessRelation: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessRelation" },
  providerBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  receiverBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  isSeen: { type: Boolean, default: false },
  isAnswerNeed: Boolean,
  answer: Boolean,
});

const ReportModel: Model<IReport> = mongoose.models.Report || mongoose.model<IReport>("Report", schema);
export default ReportModel; 