import { Schema } from "mongoose";
import mongoose from "mongoose"

const schema = new Schema({

    code: {
        type: Number, minLength: 4, maxLength: 6,
        required: true,
        unique: true,
    },

    phoneHash:{
        type:String,
        required: true,
        unique: true,
    },
   

},{ timestamps: true })

const userModel = mongoose.models.User || mongoose.model("User",schema)
export default userModel