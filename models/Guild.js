import * as mongoose from 'mongoose';
import { Schema } from "mongoose";
import BusinessModel from './Business';

const schema = new Schema({
    name: { type: String, required: true },
    products: [
        {
            productName: { type: String, required: true },
            unitOfMeasurement: { type: String, required: true }
        }
    ]
}, { timestamps: true })

const GuildModel = mongoose.models.Guild || mongoose.model("Guilds", schema)
export default GuildModel