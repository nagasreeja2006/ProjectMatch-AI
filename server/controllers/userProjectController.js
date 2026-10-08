const dbService = require('../services/dbService');

// @desc    Get user's active/tracked projects
// @route   GET /api/my-projects
const getUserProjects = async (req, res, next) => {
  try {
    const projects = await dbService.getUserProjects(req.user._id || req.user.id);
    res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Start/Create tracked user project
// @route   POST /api/my-projects
const createUserProject = async (req, res, next) => {
  try {
    const { projectId, title, description, technologies, domain, difficulty, targetDate, status } = req.body;

    let projectTitle = title;
    let projectDesc = description;
    let projectTech = technologies || [];
    let projectDomain = domain || 'Web Development';
    let projectDiff = difficulty || 'Medium';

    if (projectId) {
      const orig = await dbService.getProjectById(projectId);
      if (orig) {
        projectTitle = projectTitle || orig.title;
        projectDesc = projectDesc || orig.description;
        projectTech = projectTech.length ? projectTech : orig.technologies;
        projectDomain = projectDomain || orig.domain;
        projectDiff = projectDiff || orig.difficulty;
      }
    }

    const newProject = await dbService.createUserProject({
      userId: req.user._id || req.user.id,
      projectId: projectId || null,
      title: projectTitle || 'Untitled Project',
      description: projectDesc || '',
      technologies: projectTech,
      domain: projectDomain,
      difficulty: projectDiff,
      status: status || 'Planning',
      progress: 10,
      tasksTotal: 10,
      tasksCompleted: 1,
      startDate: new Date(),
      targetDate: targetDate || new Date(Date.now() + 30 * 86400000),
    });

    res.status(201).json({
      success: true,
      message: 'Project added to My Projects tracker',
      project: newProject
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update tracked user project
// @route   PUT /api/my-projects/:id
const updateUserProject = async (req, res, next) => {
  try {
    const allowed = ['title', 'description', 'status', 'progress', 'tasksTotal', 'tasksCompleted', 'notes', 'githubUrl', 'demoUrl', 'targetDate'];
    const updates = {};
    allowed.forEach(k => {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    });

    const updated = await dbService.updateUserProject(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Tracked project not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Project tracker updated',
      project: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete tracked user project
// @route   DELETE /api/my-projects/:id
const deleteUserProject = async (req, res, next) => {
  try {
    await dbService.deleteUserProject(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Project removed from tracker'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProjects, createUserProject, updateUserProject, deleteUserProject };
