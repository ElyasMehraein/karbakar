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
    jobCategory: {
        type: String,
        required: true,
        enum: [
            "لوازم خانگی و محصولات",
            "لوازم ساختمانی و محصولات",
            "لوازم کشاورزی و محصولات",
            "لوازم منسوجات و محصولات",
            "لوازم حمل و نقل و محصولات",
            "املاک و اراضی",
            "تولیدات آهن و فلزات سخت",
            "خدمات الکترونیک",
            "خدمات خودرویی",
            "خدمات آزمایشگاهی",
            "خدمات فلزکاری",
            "خدمات گردشگری",
            "خدمات عمرانی",
            "خدمات ارتباطی",
            "خدمات نساجی",
            "خدمات بهداشتی",
            "خدمات صوت و تصویر"
        ],
    },

}, { timestamps: true })
const GuildModel = mongoose.models.Guild || mongoose.model("Guild", schema)
export default GuildModel