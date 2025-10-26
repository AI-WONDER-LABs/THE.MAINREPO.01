/**
 * Marketplace Routes
 */

const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');

// Public routes - no authentication required
router.get('/projects', marketplaceController.getMarketplaceProjects);
router.get('/projects/:id', marketplaceController.getMarketplaceProject);

module.exports = router;
