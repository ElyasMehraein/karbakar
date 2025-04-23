import * as mongoose from 'mongoose';
import { Schema, Document } from "mongoose";
import BusinessModel from './Business';

export interface IUser extends Document {
  phoneHash: string;
  code: number;
  userName?: string;
  avatarUrl?: string;
  headerUrl?: string;
  bio?: string;
  explain?: string;
  phone?: string;
  email?: string;
  personalPage?: string;
  primeJob?: mongoose.Types.ObjectId;
  businesses: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

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
  },
  avatarUrl: {
    type: String,
    maxlength: 100,
  },
  headerUrl: {
    type: String,
    maxlength: 100,
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
    type: String,
    maxlength: 10,
  },
  email: {
    type: String,
    maxlength: 30,
  },
  personalPage: {
    type: String,
    maxlength: 30,
  },
  primeJob: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  },
  businesses: [{
    type: Schema.Types.ObjectId,
    ref: 'Business'
  }]
}, {
  timestamps: true
});

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', schema);

export default UserModel; 