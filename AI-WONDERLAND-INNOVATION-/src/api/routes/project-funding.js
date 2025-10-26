/**
 * Project Funding Routes
 */

const express = require('express');
const router = express.Router();
const projectFundingController = require('../controllers/projectFundingController');
const { authenticate } = require('../../auth/middleware');

// All routes require authentication
router.use(authenticate);

// Funding routes
router.post('/:projectId/funding', projectFundingController.setProjectFunding);
router.get('/:projectId/funding', projectFundingController.getProjectFunding);

// Links routes
router.post('/:projectId/links', projectFundingController.setProjectLinks);
router.get('/:projectId/links', projectFundingController.getProjectLinks);

module.exports = router;
