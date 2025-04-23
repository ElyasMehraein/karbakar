import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IBugReport extends Document {
  description: string;
  sender?: number;
  createdAt: Date;
  updatedAt: Date;
}

const bugReportSchema = new Schema(
  {
    description: {
      type: String,
      maxlength: 150,
      required: true,
    },
    sender: {
      type: Number,
    },
  },
  { timestamps: true }
);

const BugReportModel: Model<IBugReport> =
  mongoose.models.BugReport ||
  mongoose.model<IBugReport>('BugReport', bugReportSchema);

export default BugReportModel;
