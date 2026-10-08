const express = require('express');
const router = express.Router();
const { getUserProjects, createUserProject, updateUserProject, deleteUserProject } = require('../controllers/userProjectController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getUserProjects);
router.post('/', createUserProject);
router.put('/:id', updateUserProject);
router.delete('/:id', deleteUserProject);

module.exports = router;
