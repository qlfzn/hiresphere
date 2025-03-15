const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController');
// const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all project routes
// router.use(authMiddleware);

// Project routes -> '/api/projects'
router.post('/create', projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.post('/:id/matches', projectController.findMatches);

module.exports = router;