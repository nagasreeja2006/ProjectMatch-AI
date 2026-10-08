const dbService = require('../services/dbService');
const { calculateDeterministicMatch } = require('../services/geminiService');

// @desc    Get all projects with filtering, search, and sorting
// @route   GET /api/projects
const getProjects = async (req, res, next) => {
  try {
    const { domain, difficulty, technology, careerGoal, search, sort } = req.query;
    let projects = await dbService.getAllProjects({ domain, difficulty, search }, sort);

    // Filter by technology if provided
    if (technology && technology !== 'All') {
      const techLower = technology.toLowerCase();
      projects = projects.filter(p => 
        (p.technologies || []).some(t => t.toLowerCase() === techLower) ||
        (p.requiredSkills || []).some(s => s.toLowerCase() === techLower)
      );
    }

    // Filter by careerGoal if provided
    if (careerGoal && careerGoal !== 'All') {
      const cgLower = careerGoal.toLowerCase();
      projects = projects.filter(p => 
        (p.careerGoals || []).some(cg => cg.toLowerCase().includes(cgLower))
      );
    }

    // If user is authenticated, compute personalized match scores
    if (req.user) {
      projects = projects.map(p => {
        const matchData = calculateDeterministicMatch(req.user, p);
        return {
          ...(p.toObject ? p.toObject() : p),
          matchScore: matchData.matchScore,
          matchBreakdown: {
            skillMatch: matchData.skillMatch,
            careerMatch: matchData.careerMatch,
            difficultyMatch: matchData.difficultyMatch,
            timeMatch: matchData.timeMatch,
            interestMatch: matchData.interestMatch,
            reason: matchData.reason
          }
        };
      });

      if (sort === 'bestMatch' || !sort) {
        projects.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      }
    } else {
      if (sort === 'popularity' || !sort) {
        projects.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      }
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
const getProjectById = async (req, res, next) => {
  try {
    const project = await dbService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    let result = project.toObject ? project.toObject() : { ...project };

    if (req.user) {
      const matchData = calculateDeterministicMatch(req.user, project);
      result.matchScore = matchData.matchScore;
      result.matchBreakdown = {
        skillMatch: matchData.skillMatch,
        careerMatch: matchData.careerMatch,
        difficultyMatch: matchData.difficultyMatch,
        timeMatch: matchData.timeMatch,
        interestMatch: matchData.interestMatch,
        reason: matchData.reason
      };
    }

    res.status(200).json({
      success: true,
      project: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
const createProject = async (req, res, next) => {
  try {
    const newProj = await dbService.createProject(req.body);
    res.status(201).json({
      success: true,
      project: newProj
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
const updateProject = async (req, res, next) => {
  try {
    const updated = await dbService.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({
      success: true,
      project: updated
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject };
