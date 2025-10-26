/**
 * Investment Controller
 * Handles investment operations and investor dashboard
 */

const Investment = require('../../models/Investment');
const ProjectFunding = require('../../models/ProjectFunding');
const ProjectLinks = require('../../models/ProjectLinks');
const Project = require('../../models/Project');
const Joi = require('joi');

/**
 * Validate investment creation input
 */
const createInvestmentSchema = Joi.object({
  projectId: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  currency: Joi.string().default('USD'),
  paymentMethod: Joi.string().valid('stripe', 'paypal').required(),
  agreementType: Joi.string().valid('equity', 'revenue-share', 'donation', 'loan').default('equity'),
  equityPercentage: Joi.number().min(0).max(100).optional(),
  revenueShare: Joi.number().min(0).max(100).optional(),
});

/**
 * Create new investment (initiate payment)
 */
const createInvestment = async (req, res) => {
  try {
    const { error, value } = createInvestmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { projectId, amount, currency, paymentMethod, agreementType, equityPercentage, revenueShare } = value;

    // Verify project exists and is seeking investment
    const project = await Project.findOne({
      _id: projectId,
      isSeekingInvestment: true,
      status: 'published',
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or not accepting investments',
      });
    }

    // Get funding details
    const funding = await ProjectFunding.findOne({ projectId });
    if (!funding) {
      return res.status(404).json({
        success: false,
        message: 'Project funding information not found',
      });
    }

    // Validate investment amount
    if (funding.minimumInvestment && amount < funding.minimumInvestment) {
      return res.status(400).json({
        success: false,
        message: `Minimum investment amount is ${funding.minimumInvestment} ${currency}`,
      });
    }

    if (funding.maximumInvestment && amount > funding.maximumInvestment) {
      return res.status(400).json({
        success: false,
        message: `Maximum investment amount is ${funding.maximumInvestment} ${currency}`,
      });
    }

    // Create investment record
    const investment = new Investment({
      investorId: req.user._id,
      projectId,
      amount,
      currency,
      paymentMethod,
      status: 'pending',
      terms: {
        agreementType,
        equityPercentage,
        revenueShare,
      },
    });

    await investment.save();

    // In a real implementation, you would:
    // 1. Create Stripe PaymentIntent or PayPal order
    // 2. Return client_secret for frontend to complete payment
    // For now, we'll return a placeholder

    res.status(201).json({
      success: true,
      message: 'Investment initiated successfully',
      data: {
        investment,
        // In production: clientSecret: paymentIntent.client_secret
        clientSecret: 'placeholder_client_secret',
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Create investment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create investment',
    });
  }
};

/**
 * Get investor dashboard data
 */
const getInvestorDashboard = async (req, res) => {
  try {
    const investorId = req.user._id;

    // Get all investments
    const investments = await Investment.find({ investorId })
      .populate({
        path: 'projectId',
        select: 'name description type status',
        populate: {
          path: 'userId',
          select: 'name email',
        },
      })
      .sort({ createdAt: -1 })
      .lean();

    // Calculate statistics
    const stats = {
      totalInvested: 0,
      activeInvestments: 0,
      completedInvestments: 0,
      pendingInvestments: 0,
    };

    investments.forEach((inv) => {
      if (inv.status === 'completed') {
        stats.totalInvested += inv.amount;
        stats.completedInvestments += 1;
        stats.activeInvestments += 1;
      } else if (inv.status === 'pending') {
        stats.pendingInvestments += 1;
      }
    });

    res.json({
      success: true,
      data: {
        investments,
        stats,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get investor dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get investor dashboard',
    });
  }
};

/**
 * Get single investment details
 */
const getInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const investorId = req.user._id;

    const investment = await Investment.findOne({
      _id: id,
      investorId,
    })
      .populate({
        path: 'projectId',
        populate: {
          path: 'userId',
          select: 'name email',
        },
      })
      .lean();

    if (!investment) {
      return res.status(404).json({
        success: false,
        message: 'Investment not found',
      });
    }

    // Get project funding and links
    const funding = await ProjectFunding.findOne({
      projectId: investment.projectId._id,
    }).lean();

    const links = await ProjectLinks.findOne({
      projectId: investment.projectId._id,
    }).lean();

    res.json({
      success: true,
      data: {
        investment: {
          ...investment,
          projectFunding: funding,
          projectLinks: links,
        },
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get investment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get investment',
    });
  }
};

/**
 * Update investment status (webhook handler for payment completion)
 */
const updateInvestmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, transactionId } = req.body;

    const investment = await Investment.findById(id);
    if (!investment) {
      return res.status(404).json({
        success: false,
        message: 'Investment not found',
      });
    }

    investment.status = status;
    if (transactionId) investment.transactionId = transactionId;

    if (status === 'completed') {
      investment.metadata.completedAt = new Date();

      // Update project funding
      await ProjectFunding.findOneAndUpdate(
        { projectId: investment.projectId },
        {
          $inc: {
            amountRaised: investment.amount,
            investorCount: 1,
          },
        }
      );
    } else if (status === 'refunded') {
      investment.metadata.refundedAt = new Date();

      // Update project funding
      await ProjectFunding.findOneAndUpdate(
        { projectId: investment.projectId },
        {
          $inc: {
            amountRaised: -investment.amount,
            investorCount: -1,
          },
        }
      );
    }

    await investment.save();

    res.json({
      success: true,
      message: 'Investment status updated',
      data: { investment },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Update investment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update investment status',
    });
  }
};

module.exports = {
  createInvestment,
  getInvestorDashboard,
  getInvestment,
  updateInvestmentStatus,
};
