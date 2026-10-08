const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject, updateProject } = require('../controllers/projectController');
const { optionalAuth, protect } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, getProjects);
router.get('/:id', optionalAuth, getProjectById);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);

module.exports = router;
