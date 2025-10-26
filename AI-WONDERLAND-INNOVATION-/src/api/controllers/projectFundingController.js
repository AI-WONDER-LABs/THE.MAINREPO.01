/**
 * Project Funding Controller
 * Handles funding configuration and external links for projects
 */

const ProjectFunding = require('../../models/ProjectFunding');
const ProjectLinks = require('../../models/ProjectLinks');
const Project = require('../../models/Project');
const Joi = require('joi');

/**
 * Validate funding creation/update input
 */
const fundingSchema = Joi.object({
  fundingGoal: Joi.number().min(0).required(),
  currency: Joi.string().default('USD'),
  fundingType: Joi.string()
    .valid('equity', 'revenue-share', 'donation', 'loan', 'mixed')
    .default('equity'),
  termsAndConditions: Joi.string().optional(),
  minimumInvestment: Joi.number().min(0).default(100),
  maximumInvestment: Joi.number().min(0).optional(),
  deadlineDate: Joi.date().optional(),
  milestones: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        description: Joi.string().optional(),
        targetAmount: Joi.number().min(0).required(),
      })
    )
    .optional(),
});

/**
 * Validate links input
 */
const linksSchema = Joi.object({
  website: Joi.string().uri().optional().allow(''),
  appStore: Joi.object({
    ios: Joi.string().uri().optional().allow(''),
    android: Joi.string().uri().optional().allow(''),
  }).optional(),
  repository: Joi.object({
    github: Joi.string().uri().optional().allow(''),
    gitlab: Joi.string().uri().optional().allow(''),
    bitbucket: Joi.string().uri().optional().allow(''),
  }).optional(),
  social: Joi.object({
    linkedin: Joi.string().uri().optional().allow(''),
    twitter: Joi.string().uri().optional().allow(''),
    facebook: Joi.string().uri().optional().allow(''),
    instagram: Joi.string().uri().optional().allow(''),
    reddit: Joi.string().uri().optional().allow(''),
    youtube: Joi.string().uri().optional().allow(''),
  }).optional(),
  professional: Joi.object({
    behance: Joi.string().uri().optional().allow(''),
    dribbble: Joi.string().uri().optional().allow(''),
    medium: Joi.string().uri().optional().allow(''),
  }).optional(),
  other: Joi.array()
    .items(
      Joi.object({
        label: Joi.string().required(),
        url: Joi.string().uri().required(),
      })
    )
    .optional(),
});

/**
 * Create or update project funding
 */
const setProjectFunding = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify project ownership
    const project = await Project.findOne({ _id: projectId, userId: req.user._id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const { error, value } = fundingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Create or update funding
    let funding = await ProjectFunding.findOne({ projectId });

    if (funding) {
      Object.assign(funding, value);
      await funding.save();
    } else {
      funding = new ProjectFunding({
        projectId,
        ...value,
      });
      await funding.save();
    }

    // Update project to mark as seeking investment
    project.isSeekingInvestment = true;
    await project.save();

    res.json({
      success: true,
      message: 'Project funding configured successfully',
      data: { funding },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Set project funding error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to configure project funding',
    });
  }
};

/**
 * Get project funding
 */
const getProjectFunding = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify project ownership
    const project = await Project.findOne({ _id: projectId, userId: req.user._id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const funding = await ProjectFunding.findOne({ projectId });

    res.json({
      success: true,
      data: { funding: funding || null },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get project funding error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get project funding',
    });
  }
};

/**
 * Create or update project links
 */
const setProjectLinks = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify project ownership
    const project = await Project.findOne({ _id: projectId, userId: req.user._id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const { error, value } = linksSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Create or update links
    let links = await ProjectLinks.findOne({ projectId });

    if (links) {
      Object.assign(links, value);
      await links.save();
    } else {
      links = new ProjectLinks({
        projectId,
        ...value,
      });
      await links.save();
    }

    res.json({
      success: true,
      message: 'Project links updated successfully',
      data: { links },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Set project links error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project links',
    });
  }
};

/**
 * Get project links
 */
const getProjectLinks = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify project ownership
    const project = await Project.findOne({ _id: projectId, userId: req.user._id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const links = await ProjectLinks.findOne({ projectId });

    res.json({
      success: true,
      data: { links: links || null },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get project links error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get project links',
    });
  }
};

module.exports = {
  setProjectFunding,
  getProjectFunding,
  setProjectLinks,
  getProjectLinks,
};
