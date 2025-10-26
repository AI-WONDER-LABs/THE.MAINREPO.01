/**
 * Investment Routes
 */

const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investmentController');
const { authenticate } = require('../../auth/middleware');

// All routes require authentication
router.use(authenticate);

// Create investment
router.post('/', investmentController.createInvestment);

// Get investor dashboard
router.get('/dashboard', investmentController.getInvestorDashboard);

// Get single investment
router.get('/:id', investmentController.getInvestment);

// Update investment status (for webhooks/admin)
router.patch('/:id/status', investmentController.updateInvestmentStatus);

module.exports = router;
