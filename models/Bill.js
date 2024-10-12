import * as mongoose from 'mongoose';
import { Schema } from "mongoose";
import BusinessModel from './Business';
import UserModel from './User';

const schema = new Schema({
    guild:{ type: String, required: true },
    from:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            productName: { type: String, maxlength: 30 },
            unitOfMeasurement: { type: String, maxlength: 20 },
            amount: { type: Number, min: 1, max: 9999 },
        }
    ],
    status:{ type: String }
}, { timestamps: true })

const BillModel = mongoose.models.Bill || mongoose.model("Bill", schema)
export default BillModel