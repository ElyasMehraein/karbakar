import * as mongoose from 'mongoose';
import { Schema } from "mongoose";
import BusinessModel from './Business';
import UserModel from './User';
import ProductModel from './Product';

const schema = new Schema({
    guild: { type: mongoose.Schema.Types.ObjectId, ref: "Guild" },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            totalDelivered: { type: Number, min: 1, max: 9999 },
            amount: { type: Number, min: 1, max: 9999 },
        }
    ],
    status: { type: String }
}, { timestamps: true })

const BillModel = mongoose.models.Bill || mongoose.model("Bill", schema)
export default BillModel