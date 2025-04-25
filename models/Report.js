import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'
import BusinessModel from './Business'
import UserModel from './User'
import BillModel from './Bill'
import BusinessRelationModel from './BusinessRelation'

const schema = new Schema({
  recepiant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, maxlength: 20, required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill' },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      amount: { type: Number, min: 1, max: 9999, required: true },
    },
  ],
  businessRelation: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessRelation' },
  providerBusiness: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  receiverBusiness: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  isSeen: { type: Boolean, default: false },
  isAnswerNeed: Boolean,
  answer: Boolean,
})

const ReportModel = mongoose.models.Report || mongoose.model('Report', schema)
export default ReportModel
