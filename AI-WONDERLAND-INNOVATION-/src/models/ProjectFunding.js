/**
 * ProjectFunding Model (MongoDB)
 * Represents funding goals and progress for projects seeking investment
 */

const mongoose = require('mongoose');

const projectFundingSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      unique: true,
      index: true,
    },
    fundingGoal: {
      type: Number,
      required: true,
      min: 0,
    },
    amountRaised: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    isSeekingInvestment: {
      type: Boolean,
      default: true,
      index: true,
    },
    fundingType: {
      type: String,
      enum: ['equity', 'revenue-share', 'donation', 'loan', 'mixed'],
      default: 'equity',
    },
    investorCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    milestones: [
      {
        title: String,
        description: String,
        targetAmount: Number,
        reached: {
          type: Boolean,
          default: false,
        },
        reachedAt: Date,
      },
    ],
    deadlineDate: {
      type: Date,
    },
    termsAndConditions: {
      type: String,
    },
    minimumInvestment: {
      type: Number,
      default: 100,
      min: 0,
    },
    maximumInvestment: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Index for marketplace queries
projectFundingSchema.index({ isSeekingInvestment: 1, createdAt: -1 });

const ProjectFunding = mongoose.model('ProjectFunding', projectFundingSchema);

module.exports = ProjectFunding;
