import * as mongoose from 'mongoose';
import { Schema } from "mongoose";
import BusinessModel from './Business';

const schema = new Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    },
    isAnswerNeed: Boolean,
}, { timestamps: true })

const BusinessRelationModel = mongoose.models.BusinessRelation || mongoose.model("BusinessRelation", schema)
export default BusinessRelationModel