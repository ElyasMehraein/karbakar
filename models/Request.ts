import { Schema, Document, Model, Types } from "mongoose";
import mongoose from "mongoose";
import { IBusiness } from './Business';
import { JobCategory } from './Guild';

export interface IRequest extends Document {
  uniqCode?: string;
  requesterBusiness?: Types.ObjectId | IBusiness;
  acceptedBy: Array<Types.ObjectId | IBusiness>;
  title?: string;
  message?: string;
  guild: JobCategory;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  uniqCode: { type: String, length: 64 },
  requesterBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  acceptedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business"
    }
  ],
  title: { type: String, maxlength: 30 },
  message: { type: String, maxlength: 150 },
  guild: { type: String, required: true },
}, { timestamps: true });

const RequestModel: Model<IRequest> = mongoose.models.Request || mongoose.model<IRequest>("Request", schema);
export default RequestModel; 