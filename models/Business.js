import { Schema } from "mongoose";
import mongoose from "mongoose"

const schema = new Schema({
    businessName: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30,
    },
    businessBrand: {
        type: String,
        maxlength: 30,
    },
    bio: {
        type: String,
        maxlength: 150,
    },
    explain: {
        type: String,
        maxlength: 300,
    },
    phone: {
        type: String,
        maxlength: 11,
    },
    email: {
        type: String,
        maxlength: 30,
    },
    personalPage: {
        type: String, maxlength: 30,

    },
    instagram: {
        type: String, maxlength: 30,

    },
    longitude: { type: String, maxlength: 30, },
    latitude: { type: String, maxlength: 30, },
    mapDetail: { type: String, maxlength: 30, },
    agentCode: { type: String, maxlength: 30, },
    workers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    guildname: { type: String, required: true, maxlength: 30 },
    products: [
        {
            productName: { type: String, maxlength: 30 },
            unitOfMeasurement: { type: String, maxlength: 20 },
            totalDelivered: { type: Number, min: 1, max: 9999 },
            lastYearDelivered: { type: Number, min: 0, max: 9999 },
            thisYearDelivered: { type: Number, min: 1, max: 9999 },
            uniqueCustomer: { type: Number, min: 1, max: 9999 },
        }
    ]
}, { timestamps: true })

const BusinessModel = mongoose.models.Business || mongoose.model("Business", schema)
export default BusinessModel