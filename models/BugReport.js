import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const bugReportSchema = new Schema(
  {
    description: {
      type: String,
      maxlength: 150,
      required: true,
    },
    sender: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const BugReportModel =
  mongoose.models.BugReport || mongoose.model("BugReport", bugReportSchema);

export default BugReportModel;
