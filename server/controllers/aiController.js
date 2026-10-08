const dbService = require('../services/dbService');
const geminiService = require('../services/geminiService');

// @desc    Get AI Project Recommendations
// @route   POST /api/ai/recommend-projects
const getRecommendations = async (req, res, next) => {
  try {
    let profile = req.body;

    // If user is authenticated and body is empty, use user profile
    if ((!profile || !profile.skills || profile.skills.length === 0) && req.user) {
      profile = req.user;
    }

    const allProjects = await dbService.getAllProjects();
    const recommendations = await geminiService.generateRecommendations(profile, allProjects);

    // Populate full project objects into recommendations
    const enriched = recommendations.map(rec => {
      const proj = allProjects.find(p => String(p._id || p.id) === String(rec.projectId));
      return {
        ...rec,
        project: proj || null
      };
    }).filter(r => r.project !== null);

    // Save to history if user is logged in
    if (req.user) {
      await dbService.recordRecommendation({
        userId: req.user._id || req.user.id,
        profileSnapshot: {
          skills: profile.skills,
          interests: profile.interests,
          careerGoal: profile.careerGoal,
          difficulty: profile.difficultyPreference,
          time: profile.availableTime,
        },
        recommendations: enriched.map(r => ({
          projectId: r.project._id || r.project.id,
          matchScore: r.matchScore,
          reason: r.reason,
          skillMatch: r.skillMatch,
          careerMatch: r.careerMatch,
          difficultyMatch: r.difficultyMatch,
          timeMatch: r.timeMatch,
          interestMatch: r.interestMatch,
        })),
        isAiGenerated: true
      });
    }

    res.status(200).json({
      success: true,
      recommendations: enriched
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate Project Blueprint
// @route   POST /api/ai/project-blueprint
const getProjectBlueprint = async (req, res, next) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json({ success: false, message: 'projectId is required' });
    }

    const project = await dbService.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const blueprint = await geminiService.generateProjectBlueprint(project, req.user || {});

    res.status(200).json({
      success: true,
      project: { id: project._id || project.id, title: project.title },
      blueprint
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate Development Roadmap
// @route   POST /api/ai/roadmap
const getRoadmap = async (req, res, next) => {
  try {
    const { projectId } = req.body;
    let project = null;

    if (projectId) {
      project = await dbService.getProjectById(projectId);
    }

    if (!project) {
      // Build a fallback virtual project if only title was provided
      project = {
        title: req.body.title || 'Engineering Software Project',
        domain: req.body.domain || 'Web Development',
        technologies: req.body.technologies || ['React', 'Node.js', 'MongoDB'],
        features: req.body.features || ['User Authentication', 'REST API', 'Data Visualization']
      };
    }

    const roadmapData = await geminiService.generateRoadmap(project, req.user || {});

    // If user is logged in and projectId is provided, persist roadmap
    let savedRoadmap = null;
    if (req.user) {
      savedRoadmap = await dbService.saveRoadmap({
        userId: req.user._id || req.user.id,
        projectId: project._id || project.id || null,
        projectTitle: project.title,
        tasks: roadmapData.tasks,
        totalTasks: roadmapData.tasks.length,
        completedTasks: 0,
        progress: 0,
        estimatedWeeks: roadmapData.estimatedWeeks || 4
      });
    }

    res.status(200).json({
      success: true,
      roadmap: savedRoadmap || roadmapData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze Skill Gap
// @route   POST /api/ai/skill-gap
const getSkillGap = async (req, res, next) => {
  try {
    const { projectId, userSkills } = req.body;
    if (!projectId) {
      return res.status(400).json({ success: false, message: 'projectId is required' });
    }

    const project = await dbService.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const skills = userSkills || (req.user ? req.user.skills : []);
    const gapAnalysis = await geminiService.analyzeSkillGap(skills, project);

    res.status(200).json({
      success: true,
      projectTitle: project.title,
      analysis: gapAnalysis
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Compare up to 3 Projects
// @route   POST /api/ai/compare
const compareProjects = async (req, res, next) => {
  try {
    const { projectIds } = req.body;
    if (!projectIds || !Array.isArray(projectIds) || projectIds.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of projectIds (up to 3)' });
    }

    const projectsList = [];
    for (const id of projectIds.slice(0, 3)) {
      const p = await dbService.getProjectById(id);
      if (p) projectsList.push(p);
    }

    if (projectsList.length === 0) {
      return res.status(404).json({ success: false, message: 'No valid projects found for comparison' });
    }

    const result = await geminiService.compareProjects(projectsList, req.user || {});

    res.status(200).json({
      success: true,
      comparison: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate Resume Bullet Point
// @route   POST /api/ai/resume-bullet
const getResumeBullet = async (req, res, next) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json({ success: false, message: 'projectId is required' });
    }

    const project = await dbService.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const result = await geminiService.generateResumeBullet(project, req.user || {});

    res.status(200).json({
      success: true,
      projectTitle: project.title,
      resumeAnalysis: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Contextual Project Assistant
// @route   POST /api/ai/project-assistant
const chatProjectAssistant = async (req, res, next) => {
  try {
    const { projectId, message, history } = req.body;
    if (!projectId || !message) {
      return res.status(400).json({ success: false, message: 'projectId and message are required' });
    }

    const project = await dbService.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const reply = await geminiService.projectAssistant(project, req.user || {}, message, history || []);

    res.status(200).json({
      success: true,
      reply
    });
  } catch (error) {
    next(error);
  }
};

// @desc    AI Custom Project Builder
// @route   POST /api/ai/project-builder
const buildCustomProject = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ success: false, message: 'Project idea prompt is required' });
    }

    const projectData = await geminiService.generateCustomProject(prompt, req.user || {});

    res.status(200).json({
      success: true,
      project: projectData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's roadmaps
// @route   GET /api/ai/roadmaps
const getUserRoadmaps = async (req, res, next) => {
  try {
    const roadmaps = await dbService.getRoadmaps(req.user._id || req.user.id);
    res.status(200).json({
      success: true,
      roadmaps
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task status in roadmap
// @route   PUT /api/ai/roadmaps/:id/task
const updateRoadmapTask = async (req, res, next) => {
  try {
    const { taskId, status } = req.body;
    const roadmap = await dbService.getRoadmapById(req.params.id);
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }

    const task = roadmap.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
      const completed = roadmap.tasks.filter(t => t.status === 'Completed').length;
      roadmap.completedTasks = completed;
      roadmap.progress = Math.round((completed / roadmap.tasks.length) * 100);
      await dbService.updateRoadmap(req.params.id, {
        tasks: roadmap.tasks,
        completedTasks: completed,
        progress: roadmap.progress
      });
    }

    res.status(200).json({
      success: true,
      roadmap
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendations,
  getProjectBlueprint,
  getRoadmap,
  getSkillGap,
  compareProjects,
  getResumeBullet,
  chatProjectAssistant,
  buildCustomProject,
  getUserRoadmaps,
  updateRoadmapTask,
};
