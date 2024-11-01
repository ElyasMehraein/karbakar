import * as mongoose from 'mongoose';
import { Schema } from "mongoose";
import BusinessModel from './Business';
import UserModel from './User';
import ProductModel from './Product';

const schema = new Schema({
    guild: { type: mongoose.Schema.Types.ObjectId, ref: "Guild", required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "Business" , required: true},
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            totalDelivered: { type: Number, min: 1, max: 9999, required: true },
            amount: { type: Number, min: 1, max: 9999 , required: true},
        }
    ],
    status: { type: String }
}, { timestamps: true })

const BillModel = mongoose.models.Bill || mongoose.model("Bill", schema)
export default BillModel