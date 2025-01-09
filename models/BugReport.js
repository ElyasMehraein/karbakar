import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const bugReportSchema = new Schema(
  {
    description: {
      type: String,
      maxlength: 150,
      required: true,
    },
    sender: {
      type: Number,
    }
  },
  { timestamps: true }
);

const BugReportModel =
  mongoose.models.BugReport || mongoose.model("BugReport", bugReportSchema);

export default BugReportModel;
