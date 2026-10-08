const { getDBStatus } = require('../config/db');
const User = require('../models/User');
const Project = require('../models/Project');
const SavedProject = require('../models/SavedProject');
const UserProject = require('../models/UserProject');
const Roadmap = require('../models/Roadmap');
const RecommendationHistory = require('../models/RecommendationHistory');
const inMemoryStore = require('./inMemoryStore');

const dbService = {
  // USERS
  async findUserByEmail(email) {
    if (getDBStatus()) {
      return await User.findOne({ email: email.toLowerCase() });
    }
    return inMemoryStore.users.findOne({ email: email.toLowerCase() });
  },

  async findUserById(id) {
    if (getDBStatus()) {
      return await User.findById(id).select('-password');
    }
    const user = inMemoryStore.users.findById(id);
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  },

  async findUserByIdWithPassword(id) {
    if (getDBStatus()) {
      return await User.findById(id);
    }
    return inMemoryStore.users.findById(id);
  },

  async createUser(userData) {
    if (getDBStatus()) {
      return await User.create(userData);
    }
    return await inMemoryStore.users.create(userData);
  },

  async updateUser(id, updates) {
    if (getDBStatus()) {
      return await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select('-password');
    }
    const updated = inMemoryStore.users.findByIdAndUpdate(id, updates);
    if (!updated) return null;
    const { password, ...safeUser } = updated;
    return safeUser;
  },

  // PROJECTS
  async getAllProjects(filter = {}, sort = null) {
    if (getDBStatus()) {
      let query = {};
      if (filter.domain && filter.domain !== 'All') query.domain = filter.domain;
      if (filter.difficulty && filter.difficulty !== 'All') query.difficulty = filter.difficulty;
      if (filter.search) {
        query.$or = [
          { title: { $regex: filter.search, $options: 'i' } },
          { description: { $regex: filter.search, $options: 'i' } },
          { technologies: { $regex: filter.search, $options: 'i' } },
          { requiredSkills: { $regex: filter.search, $options: 'i' } },
        ];
      }
      let q = Project.find(query);
      if (sort === 'popularity') q = q.sort({ popularity: -1 });
      else if (sort === 'difficulty') q = q.sort({ difficulty: 1 });
      return await q.exec();
    }
    return inMemoryStore.projects.find(filter);
  },

  async getProjectById(id) {
    if (getDBStatus()) {
      return await Project.findById(id);
    }
    return inMemoryStore.projects.findById(id);
  },

  async createProject(projectData) {
    if (getDBStatus()) {
      return await Project.create(projectData);
    }
    return inMemoryStore.projects.create(projectData);
  },

  async updateProject(id, updates) {
    if (getDBStatus()) {
      return await Project.findByIdAndUpdate(id, updates, { new: true });
    }
    return inMemoryStore.projects.findByIdAndUpdate(id, updates);
  },

  // SAVED PROJECTS
  async getSavedProjects(userId) {
    if (getDBStatus()) {
      return await SavedProject.find({ userId }).populate('projectId').sort({ createdAt: -1 });
    }
    return inMemoryStore.savedProjects.find({ userId });
  },

  async saveProject(userId, projectId, matchScore = 85) {
    if (getDBStatus()) {
      const existing = await SavedProject.findOne({ userId, projectId });
      if (existing) return existing;
      return await SavedProject.create({ userId, projectId, matchScore });
    }
    const existing = inMemoryStore.savedProjects.findOne({ userId, projectId });
    if (existing) return existing;
    return inMemoryStore.savedProjects.create({ userId, projectId, matchScore });
  },

  async removeSavedProject(userId, projectId) {
    if (getDBStatus()) {
      return await SavedProject.deleteOne({ userId, projectId });
    }
    return inMemoryStore.savedProjects.deleteOne({ userId, projectId });
  },

  // USER ACTIVE PROJECTS
  async getUserProjects(userId) {
    if (getDBStatus()) {
      return await UserProject.find({ userId }).populate('projectId').sort({ updatedAt: -1 });
    }
    return inMemoryStore.userProjects.find({ userId });
  },

  async getUserProjectById(id) {
    if (getDBStatus()) {
      return await UserProject.findById(id).populate('projectId');
    }
    return inMemoryStore.userProjects.findById(id);
  },

  async createUserProject(projectData) {
    if (getDBStatus()) {
      return await UserProject.create(projectData);
    }
    return inMemoryStore.userProjects.create(projectData);
  },

  async updateUserProject(id, updates) {
    if (getDBStatus()) {
      return await UserProject.findByIdAndUpdate(id, updates, { new: true });
    }
    return inMemoryStore.userProjects.findByIdAndUpdate(id, updates);
  },

  async deleteUserProject(id) {
    if (getDBStatus()) {
      return await UserProject.findByIdAndDelete(id);
    }
    return inMemoryStore.userProjects.findByIdAndDelete(id);
  },

  // ROADMAPS
  async getRoadmaps(userId) {
    if (getDBStatus()) {
      return await Roadmap.find({ userId }).sort({ updatedAt: -1 });
    }
    return inMemoryStore.roadmaps.find({ userId });
  },

  async getRoadmapById(id) {
    if (getDBStatus()) {
      return await Roadmap.findById(id);
    }
    return inMemoryStore.roadmaps.findById(id);
  },

  async getRoadmapByProject(userId, projectId) {
    if (getDBStatus()) {
      return await Roadmap.findOne({ userId, projectId });
    }
    return inMemoryStore.roadmaps.findOne({ userId, projectId });
  },

  async saveRoadmap(roadmapData) {
    if (getDBStatus()) {
      return await Roadmap.create(roadmapData);
    }
    return inMemoryStore.roadmaps.create(roadmapData);
  },

  async updateRoadmap(id, updates) {
    if (getDBStatus()) {
      return await Roadmap.findByIdAndUpdate(id, updates, { new: true });
    }
    return inMemoryStore.roadmaps.findByIdAndUpdate(id, updates);
  },

  // RECOMMENDATION HISTORY
  async recordRecommendation(data) {
    if (getDBStatus()) {
      return await RecommendationHistory.create(data);
    }
    return inMemoryStore.recommendations.create(data);
  }
};

module.exports = dbService;
