import * as mongoose from 'mongoose';
import { Schema } from "mongoose";

const schema = new Schema({
    productName: { type: String, maxlength: 30, required: true },
    unitOfMeasurement: { type: String, maxlength: 20, required: true },
    guild: { type: mongoose.Schema.Types.ObjectId, ref: "Guild", required: true },
    isRetail: { type: Boolean, required: true },
}, { timestamps: true })
const ProductModel = mongoose.models.Product || mongoose.model("Product", schema)
export default ProductModel