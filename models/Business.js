import { Schema } from 'mongoose'
import mongoose from 'mongoose'
import GuildModel from './Guild'

const schema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
      minlength: 4,
    },
    businessBrand: {
      type: String,
      maxlength: 30,
    },
    avatarUrl: {
      type: String,
      maxlength: 100,
    },
    headerUrl: {
      type: String,
      maxlength: 100,
    },
    bio: { type: String, maxlength: 150 },
    explain: { type: String, maxlength: 300 },
    phone: { type: String, maxlength: 11 },
    email: { type: String, maxlength: 30 },
    personalPage: { type: String, maxlength: 30 },
    instagram: {
      type: String,
      maxlength: 30,
    },
    longitude: { type: Schema.Types.Decimal128 },
    latitude: { type: Schema.Types.Decimal128 },
    mapDetail: { type: String, maxlength: 30 },
    agentCode: { type: String, maxlength: 30 },
    workers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    guild: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guild',
      required: true,
    },
    recipientProducts: [
      {
        guild: { type: mongoose.Schema.Types.ObjectId, ref: 'Guild' },
        unitOfMeasurement: { type: String, maxlength: 20 },
        totalDelivered: { type: Number, min: 1, max: 9999 },
      },
    ],
    monthlyCommitment: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        amount: { type: Number, min: 1, max: 9999 },
        lastMonthDelivered: { type: Number, min: 1, max: 9999 },
        previousMonthDelivered: { type: Number, min: 1, max: 9999 },
        lastDeliveredMonth: { type: Number, default: () => new Date().getMonth() + 1 },
      },
    ],
    demandsForGuilds: [
      {
        guild: { type: mongoose.Schema.Types.ObjectId, ref: 'Guild' },
        requestText: { type: String, maxlength: 150 },
      },
    ],
  },
  { timestamps: true }
)

const BusinessModel = mongoose.models.Business || mongoose.model('Business', schema)
export default BusinessModel
