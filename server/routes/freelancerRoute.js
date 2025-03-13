// routes/freelancerRoutes.js
const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');

// Apply auth middleware to protect these routes
// Based route -> '/api/freelancers'

// Get freelancer profile
router.get('/:id', freelancerController.getFreelancerProfile);

// Update freelancer profile
router.put('/:id', freelancerController.updateFreelancerProfile);

// Get resume URL
router.get('/:id/resume', freelancerController.getResumeUrl);

// Upload resume
router.post('/:id/resume/upload', freelancerController.uploadResume);

// Get freelancer matches
// router.get('/:id/matches', freelancerController.getMatches);

module.exports = router;