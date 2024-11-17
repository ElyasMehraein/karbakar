import * as mongoose from 'mongoose';
import { Schema } from "mongoose";

const schema = new Schema({
    unionName: { type: String, required: true, maxlength: 40, minlength: 4, },
    slogan: { type: String, maxlength: 150, },
    validityPeriod: { type: Number, required: true, max: 365 },
    extensionPeriod: { type: Number, required: true, max: 365 },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true }],
    votes: [{
        voter: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
        voteFor: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    }],
    extensionVote: [{
        extensionVoter: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    }],
    transactions: [{
        provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
        products: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }]
    }],
    isActive: { type: Boolean, }
}, { timestamps: true });

const UnionModel = mongoose.models.Union || mongoose.model("Union", schema);
export default UnionModel;
