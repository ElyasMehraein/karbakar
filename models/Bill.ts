import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

export interface IBill extends Document {
  guild: mongoose.Types.ObjectId;
  from: mongoose.Types.ObjectId;
  to?: mongoose.Types.ObjectId;
  recipientBusiness?: mongoose.Types.ObjectId;
  products: Array<{
    product: mongoose.Types.ObjectId;
    amount: number;
  }>;
  accepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
  {
    guild: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guild',
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipientBusiness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        amount: { type: Number, min: 1, max: 9999, required: true },
      },
    ],
    accepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BillModel = mongoose.models.Bill || mongoose.model<IBill>('Bill', schema);
export default BillModel;
