const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  getRecommendations,
  getProjectBlueprint,
  getRoadmap,
  getSkillGap,
  compareProjects,
  getResumeBullet,
  chatProjectAssistant,
  buildCustomProject,
  getUserRoadmaps,
  updateRoadmapTask
} = require('../controllers/aiController');
const { optionalAuth, protect } = require('../middleware/authMiddleware');

// Rate limiting for AI endpoints: max 120 calls per 15 minutes
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again in a few minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(aiLimiter);

router.post('/recommend-projects', optionalAuth, getRecommendations);
router.post('/project-blueprint', optionalAuth, getProjectBlueprint);
router.post('/roadmap', optionalAuth, getRoadmap);
router.post('/skill-gap', optionalAuth, getSkillGap);
router.post('/compare', optionalAuth, compareProjects);
router.post('/resume-bullet', optionalAuth, getResumeBullet);
router.post('/project-assistant', optionalAuth, chatProjectAssistant);
router.post('/project-builder', optionalAuth, buildCustomProject);

// User Roadmap task updates
router.get('/roadmaps', protect, getUserRoadmaps);
router.put('/roadmaps/:id/task', protect, updateRoadmapTask);

module.exports = router;
