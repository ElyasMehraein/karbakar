import { Schema } from "mongoose";
import mongoose from "mongoose"

const schema = new Schema({
    brand: {
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
    user: {
        type: mongoose.Types.ObjectId
    },
}, { timestamps: true })

const UserModel = mongoose.models.Business || mongoose.model("User", schema)
export default UserModel