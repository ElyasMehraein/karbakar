import * as mongoose from 'mongoose';
import { Schema } from "mongoose";

const schema = new Schema({
    guildName: { type: String, required: true, unique: true, required: true },
    jobCategory: {
        type: String,
        required: true,
        enum: [
            "علم و آموزش",
            "املاک و اراضی",
            "لوازم خانگی و محصولات",
            "لوازم ساختمانی و محصولات",
            "لوازم کشاورزی و محصولات",
            "لوازم منسوجات و محصولات",
            "لوازم حمل و نقل و محصولات",
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