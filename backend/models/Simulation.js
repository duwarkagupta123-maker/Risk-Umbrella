const mongoose = require('mongoose');

/**
 * Optional persisted simulation run for history / analytics.
 */
const simulationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    homeValue: { type: Number },
    carValue: { type: Number },
    income: { type: Number },
    dependents: { type: Number },
    generalEvent: { type: String },
    lifeEvent: { type: String },
    results: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
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

module.exports = mongoose.model('Simulation', simulationSchema);
