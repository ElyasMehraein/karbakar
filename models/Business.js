import { Schema } from "mongoose";
import mongoose from "mongoose"

const schema = new Schema({
    businessName: {
        type: String,
        required: true,
        unique: true,
    },

}, { timestamps: true })

const UserModel = mongoose.models.business || mongoose.model("User", schema)
export default UserModel