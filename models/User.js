import { Schema } from "mongoose";
import mongoose from "mongoose"

const schema = new Schema({

    smsCode: {
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

const UserModel = mongoose.models.User || mongoose.model("User",schema)
export default UserModel