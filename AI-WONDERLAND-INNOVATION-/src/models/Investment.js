/**
 * Investment Model (MongoDB)
 * Represents individual investments made by investors in projects
 */

const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'paypal'],
      required: true,
    },
    paymentIntentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    terms: {
      equityPercentage: Number,
      revenueShare: Number,
      agreementType: {
        type: String,
        enum: ['equity', 'revenue-share', 'donation', 'loan'],
        default: 'equity',
      },
    },
    metadata: {
      completedAt: Date,
      refundedAt: Date,
      notes: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
investmentSchema.index({ investorId: 1, projectId: 1 });
investmentSchema.index({ investorId: 1, status: 1 });
investmentSchema.index({ projectId: 1, status: 1 });

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
