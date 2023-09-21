import { Schema } from "mongoose";

const schema = new Schema({

    code: {
        type: Number, minLength: 4, maxLength: 6,
        required: true,
        unique: true,
    },

    mobNumbHash:{
        type:String,
        required: true,
        unique: true,
    },
   

},{ timestamps: true })

const userModel = mongoose.model("User",schema)

export default userModel