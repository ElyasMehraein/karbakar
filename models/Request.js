import { Schema } from 'mongoose'
import mongoose from 'mongoose'

const schema = new Schema(
  {
    uniqCode: { type: String, length: 64 },
    requesterBusiness: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    acceptedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
      },
    ],
    title: { type: String, maxlength: 30 },
    message: { type: String, maxlength: 150 },
    guild: { type: String, required: true },
  },
  { timestamps: true }
)

const RequestModel = mongoose.models.Request || mongoose.model('Request', schema)
export default RequestModel
