/**
 * API Routes Index
 * Aggregates all API routes
 */

const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const projectRoutes = require('./projects');
const marketplaceRoutes = require('./marketplace');
const investmentRoutes = require('./investments');
const projectFundingRoutes = require('./project-funding');

// API health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/investments', investmentRoutes);
router.use('/project-funding', projectFundingRoutes);

module.exports = router;
