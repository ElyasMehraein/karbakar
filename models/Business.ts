import mongoose, { Document, Schema } from 'mongoose';

export interface IBusiness extends Document {
  businessName: string;
  businessBrand?: string;
  avatarUrl?: string;
  headerUrl?: string;
  bio?: string;
  explain?: string;
  phone?: string;
  email?: string;
  personalPage?: string;
  instagram?: string;
  longitude?: mongoose.Types.Decimal128;
  latitude?: mongoose.Types.Decimal128;
  mapDetail?: string;
  agentCode?: string;
  workers: mongoose.Types.ObjectId[];
  guild: mongoose.Types.ObjectId;
  recipientProducts: Array<{
    guild: mongoose.Types.ObjectId;
    unitOfMeasurement: string;
    totalDelivered: number;
  }>;
  monthlyCommitment: Array<{
    product: mongoose.Types.ObjectId;
    unitOfMeasurement: string;
    amount: number;
  }>;
  demandsForGuilds: Array<{
    guild: mongoose.Types.ObjectId;
    unitOfMeasurement: string;
    amount: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

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
        unitOfMeasurement: { type: String, maxlength: 20 },
        amount: { type: Number, min: 1, max: 9999 },
      },
    ],
    demandsForGuilds: [
      {
        guild: { type: mongoose.Schema.Types.ObjectId, ref: 'Guild' },
        unitOfMeasurement: { type: String, maxlength: 20 },
        amount: { type: Number, min: 1, max: 9999 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BusinessModel =
  mongoose.models.Business || mongoose.model<IBusiness>('Business', schema);

export default BusinessModel;
