const mongoose = require('mongoose');

const POLICY_TYPES = ['home', 'car', 'life'];
const POLICY_STATUSES = ['active', 'expired'];

/**
 * Insurance policy owned by a user.
 */
const policySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: POLICY_TYPES,
      required: [true, 'Policy type is required'],
    },
    name: {
      type: String,
      required: [true, 'Policy name is required'],
      trim: true,
    },
    coverageAmount: {
      type: Number,
      required: [true, 'Coverage amount is required'],
      min: 0,
    },
    exclusions: {
      type: [String],
      default: [],
    },
    premium: {
      type: Number,
      required: [true, 'Premium is required'],
      min: 0,
    },
    status: {
      type: String,
      enum: POLICY_STATUSES,
      default: 'active',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('Policy', policySchema);
module.exports.POLICY_TYPES = POLICY_TYPES;
module.exports.POLICY_STATUSES = POLICY_STATUSES;
