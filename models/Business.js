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
        type: Number,
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
    businesses: {
        type: String, maxlength: 30,

    },
    primeJob: {
        type: String, maxlength: 30,

    },
}, { timestamps: true })

const UserModel = mongoose.models.business || mongoose.model("User", schema)
export default UserModel