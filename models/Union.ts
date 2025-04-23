import * as mongoose from 'mongoose';
import { Schema, Document, Model, Types } from "mongoose";
import { IBusiness } from './Business';
import { IProduct } from './Product';

interface IBasketItem {
  product: Types.ObjectId | IProduct;
  amount: number;
}

interface IMember {
  member: Types.ObjectId | IBusiness;
  offerBasket: IBasketItem[];
  demandBasket: IBasketItem[];
}

interface IVote {
  voter: Types.ObjectId | IBusiness;
  voteFor: Types.ObjectId | IBusiness;
}

interface IExtensionVote {
  extensionVoter: Types.ObjectId | IBusiness;
}

interface ITransactionProduct {
  product: Types.ObjectId | IProduct;
  quantity: number;
}

interface ITransaction {
  provider: Types.ObjectId | IBusiness;
  recipient: Types.ObjectId | IBusiness;
  products: ITransactionProduct[];
}

export interface IUnion extends Document {
  unionName: string;
  slogan?: string;
  deadline: number;
  extension?: number;
  createdBy: Array<Types.ObjectId | IBusiness>;
  members: IMember[];
  votes: IVote[];
  extensionVote: IExtensionVote[];
  transactions: ITransaction[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  unionName: { type: String, required: true, maxlength: 40, minlength: 4 },
  slogan: { type: String, maxlength: 150 },
  deadline: { type: Number, required: true, max: 365 },
  extension: { type: Number, max: 365 },
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true }],
  members: [{
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    offerBasket: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        amount: { type: Number, required: true }
      }
    ],
    demandBasket: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        amount: { type: Number, required: true }
      }
    ]
  }],
  votes: [{
    voter: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    voteFor: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  }],
  extensionVote: [{
    extensionVoter: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  }],
  transactions: [{
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    products: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }]
  }],
  isActive: { type: Boolean, default: false }
}, { timestamps: true });

const UnionModel: Model<IUnion> = mongoose.models.Union || mongoose.model<IUnion>("Union", schema);
export default UnionModel; 