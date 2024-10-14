import * as mongoose from 'mongoose';
import { Schema } from "mongoose";

const schema = new Schema({
    guildName: { type: String, required: true, unique: true, },
    products: [
        {
            productName: { type: String, maxlength: 30 },
            unitOfMeasurement: { type: String, maxlength: 20 },
        }
    ],
}, { timestamps: true })
const GuildModel = mongoose.models.Guild || mongoose.model("Guild", schema)
export default GuildModel