const express = require('express');
const router = express.Router();
const { getSavedProjects, saveProject, removeSavedProject } = require('../controllers/savedController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getSavedProjects);
router.post('/:projectId', saveProject);
router.delete('/:projectId', removeSavedProject);

module.exports = router;
