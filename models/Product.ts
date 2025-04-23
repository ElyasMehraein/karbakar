import * as mongoose from 'mongoose';
import { Schema, Document, Model, Types } from "mongoose";
import { IGuild } from './Guild';

export interface IProduct extends Document {
  productName: string;
  unitOfMeasurement: string;
  guild: Types.ObjectId | IGuild;
  isRetail: boolean;
  billConfirm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  productName: { type: String, maxlength: 30, required: true },
  unitOfMeasurement: { type: String, maxlength: 20, required: true },
  guild: { type: mongoose.Schema.Types.ObjectId, ref: "Guild", required: true },
  isRetail: { type: Boolean, required: true },
  billConfirm: { type: Boolean, default: false },
}, { timestamps: true });

const ProductModel: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", schema);
export default ProductModel; 