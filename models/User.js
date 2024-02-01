import { Schema } from "mongoose";
import mongoose from "mongoose"

const schema = new Schema({
    phoneHash: {
        type: String,
        required: true,
        unique: true,
    },

    smsCode: {
        type: Number, minLength: 4, maxLength: 6,
        required: true,

    },
}, { timestamps: true })

const UserModel = mongoose.models.User || mongoose.model("User", schema)
export default UserModel