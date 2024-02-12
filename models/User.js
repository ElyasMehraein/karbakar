// import mongoose from "mongoose"
import * as mongoose from 'mongoose';
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
    },
    userName: {
        type: String,
        // minlength: 4,
        // maxlength: 30,
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
        type: Number,
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
    businesses: {
        type: String, maxlength: 30,

    },
    primeJob: {
        type: String, maxlength: 30,

    },




}, { timestamps: true })

const UserModel = mongoose.models.User || mongoose.model("User", schema)
export default UserModel