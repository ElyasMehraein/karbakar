import * as mongoose from 'mongoose';
import { Schema } from "mongoose";

const schema = new Schema({
    productName: { type: String, maxlength: 30 },
    unitOfMeasurement: { type: String, maxlength: 20 },
    guild: { type: mongoose.Schema.Types.ObjectId, ref: "Guild" },
}, { timestamps: true })
const ProductModel = mongoose.models.Product || mongoose.model("Product", schema)
export default ProductModel