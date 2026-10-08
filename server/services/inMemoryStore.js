const seedProjects = require('../seed/seedData');
const bcrypt = require('bcryptjs');

// Initialize in-memory collections
let users = [];
let projects = seedProjects.map((p, idx) => ({
  _id: `proj_${idx + 1}`,
  ...p,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));
let savedProjects = [];
let userProjects = [];
let roadmaps = [];
let recommendationHistories = [];

// Initialize Demo Student user
const initDemoUser = async () => {
  const existing = users.find(u => u.email === 'demo@projectmatch.ai');
  if (!existing) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    const demoUser = {
      _id: 'user_demo_123',
      name: 'Demo Student',
      email: 'demo@projectmatch.ai',
      password: hashedPassword,
      education: 'BTech',
      year: '3rd Year',
      branch: 'CSE',
      skills: [
        { name: 'Python', level: 'Advanced' },
        { name: 'React', level: 'Intermediate' },
        { name: 'SQL', level: 'Intermediate' },
        { name: 'Machine Learning', level: 'Intermediate' },
      ],
      interests: ['AI/ML', 'Web Development', 'Data Science'],
      careerGoal: 'AI/ML Engineer',
      difficultyPreference: 'Medium',
      availableTime: '1 month',
      projectPurpose: 'Resume',
      isDemoUser: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(demoUser);

    // Add some sample saved and active projects for the demo user
    savedProjects.push({
      _id: 'save_1',
      userId: 'user_demo_123',
      projectId: projects[0]._id, // AI Resume Analyzer
      matchScore: 95,
      status: 'Saved',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    });
    savedProjects.push({
      _id: 'save_2',
      userId: 'user_demo_123',
      projectId: projects[4]._id, // AI Interview Coach
      matchScore: 92,
      status: 'Started',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    });

    userProjects.push({
      _id: 'uproj_1',
      userId: 'user_demo_123',
      projectId: projects[0]._id,
      title: 'AI Resume Analyzer & Job Fit Scorer',
      description: 'An intelligent platform that parses resumes, extracts technical skills, and computes ATS match.',
      technologies: ['React', 'Node.js', 'Python', 'FastAPI', 'Gemini API'],
      domain: 'AI/ML',
      difficulty: 'Medium',
      status: 'In Progress',
      progress: 45,
      tasksTotal: 12,
      tasksCompleted: 5,
      startDate: new Date(Date.now() - 86400000 * 10).toISOString(),
      targetDate: new Date(Date.now() + 86400000 * 20).toISOString(),
      notes: 'Implemented text extraction and PDF parser. Currently integrating Gemini API.',
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
};

initDemoUser();

const inMemoryStore = {
  users: {
    find: (filter = {}) => {
      return users.filter(u => {
        for (let k in filter) {
          if (u[k] !== filter[k]) return false;
        }
        return true;
      });
    },
    findOne: (filter) => {
      return users.find(u => {
        for (let k in filter) {
          if (u[k] !== filter[k]) return false;
        }
        return true;
      }) || null;
    },
    findById: (id) => users.find(u => u._id === id || u.id === id) || null,
    create: async (data) => {
      const newUser = {
        _id: 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      users.push(newUser);
      return newUser;
    },
    findByIdAndUpdate: (id, updates) => {
      const user = users.find(u => u._id === id || u.id === id);
      if (user) {
        Object.assign(user, updates, { updatedAt: new Date().toISOString() });
        return { ...user };
      }
      return null;
    }
  },

  projects: {
    find: (filter = {}) => {
      let result = [...projects];
      if (filter.domain) {
        result = result.filter(p => p.domain.toLowerCase() === filter.domain.toLowerCase());
      }
      if (filter.difficulty) {
        result = result.filter(p => p.difficulty.toLowerCase() === filter.difficulty.toLowerCase());
      }
      if (filter.search) {
        const q = filter.search.toLowerCase();
        result = result.filter(p => 
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some(t => t.toLowerCase().includes(q)) ||
          p.requiredSkills.some(s => s.toLowerCase().includes(q)) ||
          p.domain.toLowerCase().includes(q)
        );
      }
      return result;
    },
    findById: (id) => projects.find(p => p._id === id || p.id === id) || null,
    create: (data) => {
      const newProj = {
        _id: 'proj_' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      projects.push(newProj);
      return newProj;
    },
    findByIdAndUpdate: (id, updates) => {
      const proj = projects.find(p => p._id === id || p.id === id);
      if (proj) {
        Object.assign(proj, updates, { updatedAt: new Date().toISOString() });
        return { ...proj };
      }
      return null;
    },
    getAll: () => [...projects],
  },

  savedProjects: {
    find: (filter = {}) => {
      let filtered = savedProjects.filter(sp => {
        for (let k in filter) {
          if (String(sp[k]) !== String(filter[k])) return false;
        }
        return true;
      });
      // Populate project
      return filtered.map(sp => ({
        ...sp,
        projectId: projects.find(p => p._id === (sp.projectId?._id || sp.projectId)) || sp.projectId
      }));
    },
    findOne: (filter) => {
      return savedProjects.find(sp => {
        for (let k in filter) {
          if (String(sp[k]) !== String(filter[k])) return false;
        }
        return true;
      }) || null;
    },
    create: (data) => {
      const newSaved = {
        _id: 'save_' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      savedProjects.push(newSaved);
      return newSaved;
    },
    deleteOne: (filter) => {
      const idx = savedProjects.findIndex(sp => {
        for (let k in filter) {
          if (String(sp[k]) !== String(filter[k])) return false;
        }
        return true;
      });
      if (idx !== -1) {
        savedProjects.splice(idx, 1);
        return { deletedCount: 1 };
      }
      return { deletedCount: 0 };
    }
  },

  userProjects: {
    find: (filter = {}) => {
      return userProjects.filter(up => {
        for (let k in filter) {
          if (String(up[k]) !== String(filter[k])) return false;
        }
        return true;
      });
    },
    findById: (id) => userProjects.find(up => up._id === id || up.id === id) || null,
    create: (data) => {
      const newUp = {
        _id: 'uproj_' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      userProjects.push(newUp);
      return newUp;
    },
    findByIdAndUpdate: (id, updates) => {
      const up = userProjects.find(u => u._id === id || u.id === id);
      if (up) {
        Object.assign(up, updates, { updatedAt: new Date().toISOString() });
        return { ...up };
      }
      return null;
    },
    findByIdAndDelete: (id) => {
      const idx = userProjects.findIndex(u => u._id === id || u.id === id);
      if (idx !== -1) {
        const deleted = userProjects.splice(idx, 1)[0];
        return deleted;
      }
      return null;
    }
  },

  roadmaps: {
    find: (filter = {}) => roadmaps.filter(r => {
      for (let k in filter) {
        if (String(r[k]) !== String(filter[k])) return false;
      }
      return true;
    }),
    findById: (id) => roadmaps.find(r => r._id === id || r.id === id) || null,
    findOne: (filter) => roadmaps.find(r => {
      for (let k in filter) {
        if (String(r[k]) !== String(filter[k])) return false;
      }
      return true;
    }) || null,
    create: (data) => {
      const newR = {
        _id: 'rm_' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      roadmaps.push(newR);
      return newR;
    },
    findByIdAndUpdate: (id, updates) => {
      const r = roadmaps.find(item => item._id === id || item.id === id);
      if (r) {
        Object.assign(r, updates, { updatedAt: new Date().toISOString() });
        return { ...r };
      }
      return null;
    }
  },

  recommendations: {
    create: (data) => {
      const newRec = {
        _id: 'rec_' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      recommendationHistories.push(newRec);
      return newRec;
    },
    find: (filter = {}) => recommendationHistories.filter(rh => {
      for (let k in filter) {
        if (String(rh[k]) !== String(filter[k])) return false;
      }
      return true;
    })
  }
};

module.exports = inMemoryStore;
