const dbService = require('../services/dbService');

/**
 * Calculates profile completion percentage based on filled profile elements
 */
function calculateCompletion(user) {
  let score = 0;
  if (user.name) score += 10;
  if (user.education) score += 10;
  if (user.year) score += 10;
  if (user.branch) score += 10;
  if (user.skills && user.skills.length >= 1) score += 20;
  if (user.skills && user.skills.length >= 3) score += 10;
  if (user.interests && user.interests.length >= 1) score += 10;
  if (user.careerGoal) score += 10;
  if (user.difficultyPreference) score += 5;
  if (user.availableTime) score += 5;
  return Math.min(100, score);
}

// @desc    Get user profile
// @route   GET /api/profile
const getProfile = async (req, res, next) => {
  try {
    const user = await dbService.findUserById(req.user._id || req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const completion = calculateCompletion(user);
    res.status(200).json({
      success: true,
      profile: user,
      completionPercentage: completion
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
const updateProfile = async (req, res, next) => {
  try {
    const allowedUpdates = [
      'name', 'education', 'year', 'branch', 'skills', 
      'interests', 'careerGoal', 'difficultyPreference', 
      'availableTime', 'projectPurpose'
    ];
    const updates = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await dbService.updateUser(req.user._id || req.user.id, updates);
    const completion = calculateCompletion(updatedUser);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile: updatedUser,
      completionPercentage: completion
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
