import * as mongoose from 'mongoose';
import { Schema } from "mongoose";

const schema = new Schema({
    unionName: { type: String, required: true, maxlength: 40, minlength: 4, },
    slogan: {
        type: String,
        maxlength: 150,
    },
    validityPeriod: { type: Number, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    }],
    votes: [{
        voter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        },
        voteFor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        },
        approved: {
            type: Boolean,
            required: true
        }
    }],
    transactions: [{
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'active'],
        default: 'pending'
    }
}, { timestamps: true });

const UnionModel = mongoose.models.Union || mongoose.model("Union", schema);
export default UnionModel;
