import { Schema } from "mongoose";
import mongoose from "mongoose"

const schema = new Schema({
    businessName: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: { type: String },

    header: {
        type: String,

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
        maxlength: 10,
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

    latitude: {
        type: String, maxlength: 30,
    },
    longitude: {
        type: String, maxlength: 30,
    },
    agentCode: {
        type: String, maxlength: 30,
    },
    workers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
}, { timestamps: true })

const BusinessModel = mongoose.models.Business || mongoose.model("Business", schema)
export default BusinessModel