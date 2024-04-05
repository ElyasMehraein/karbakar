import { Schema } from "mongoose";
import mongoose from "mongoose"

const schema = new Schema({
    Requester: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    acceptedBy:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business"
        }
    ],
    needMoreInfo:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business"
        }
    ],
    title: { type: String, maxlength: 15, },
    message: { type: String, maxlength: 15, },
    guild:{
        type: mongoose.Schema.Types.guild,
        ref: "Bill"
    }
}, { timestamps: true })

const RequestModel = mongoose.models.Request || mongoose.model("Request", schema)
export default RequestModel