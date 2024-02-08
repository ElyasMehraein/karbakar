import mongoose from "mongoose"
import { Schema } from "mongoose";


const schema = new Schema({
    phoneHash: {
        type: String,
        required: true,
        unique: true,
    },

    code: {
        type: Number,
        required: true,
        unique: true,
        min: 1000, 
        max: 999999
    }
}, { timestamps: true })

const UserModel = mongoose.models.User || mongoose.model("User", schema)
export default UserModel