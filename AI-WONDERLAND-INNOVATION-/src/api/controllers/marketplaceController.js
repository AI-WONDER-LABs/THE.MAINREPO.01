/**
 * Marketplace Controller
 * Handles browsing and discovering projects open for investment
 */

const Project = require('../../models/Project');
const ProjectFunding = require('../../models/ProjectFunding');
const ProjectLinks = require('../../models/ProjectLinks');

/**
 * Get all projects seeking investment (marketplace listing)
 */
const getMarketplaceProjects = async (req, res) => {
  try {
    const { page = 1, limit = 12, type, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = {
      isSeekingInvestment: true,
      status: 'published',
    };

    if (type) query.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    const projects = await Project.find(query)
      .populate('userId', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get funding and links data for each project
    const projectIds = projects.map((p) => p._id);

    const fundings = await ProjectFunding.find({
      projectId: { $in: projectIds },
    }).lean();

    const links = await ProjectLinks.find({
      projectId: { $in: projectIds },
    }).lean();

    // Map funding and links to projects
    const fundingMap = fundings.reduce((acc, funding) => {
      acc[funding.projectId.toString()] = funding;
      return acc;
    }, {});

    const linksMap = links.reduce((acc, link) => {
      acc[link.projectId.toString()] = link;
      return acc;
    }, {});

    const enrichedProjects = projects.map((project) => ({
      ...project,
      funding: fundingMap[project._id.toString()] || null,
      links: linksMap[project._id.toString()] || null,
    }));

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      data: {
        projects: enrichedProjects,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get marketplace projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get marketplace projects',
    });
  }
};

/**
 * Get single project details for marketplace (public view)
 */
const getMarketplaceProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({
      _id: id,
      isSeekingInvestment: true,
      status: 'published',
    })
      .populate('userId', 'name email userType')
      .lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Get funding and links data
    const funding = await ProjectFunding.findOne({ projectId: id }).lean();
    const links = await ProjectLinks.findOne({ projectId: id }).lean();

    res.json({
      success: true,
      data: {
        project: {
          ...project,
          funding: funding || null,
          links: links || null,
        },
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get marketplace project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get project details',
    });
  }
};

module.exports = {
  getMarketplaceProjects,
  getMarketplaceProject,
};
