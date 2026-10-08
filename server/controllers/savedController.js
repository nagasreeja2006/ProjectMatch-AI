const dbService = require('../services/dbService');

// @desc    Get user's saved projects
// @route   GET /api/saved
const getSavedProjects = async (req, res, next) => {
  try {
    const saved = await dbService.getSavedProjects(req.user._id || req.user.id);
    res.status(200).json({
      success: true,
      count: saved.length,
      savedProjects: saved
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save a project
// @route   POST /api/saved/:projectId
const saveProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { matchScore } = req.body;
    const saved = await dbService.saveProject(req.user._id || req.user.id, projectId, matchScore || 85);
    res.status(201).json({
      success: true,
      message: 'Project saved successfully',
      saved
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove saved project
// @route   DELETE /api/saved/:projectId
const removeSavedProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    await dbService.removeSavedProject(req.user._id || req.user.id, projectId);
    res.status(200).json({
      success: true,
      message: 'Project removed from saved list'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSavedProjects, saveProject, removeSavedProject };
