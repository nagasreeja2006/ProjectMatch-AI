import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL || '';
const baseURL = rawApiUrl 
  ? (rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/+$/, '')}/api`) 
  : '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('projectmatch_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token on authentication expiration
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/') {
        localStorage.removeItem('projectmatch_token');
        localStorage.removeItem('projectmatch_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  demoLogin: () => api.post('/auth/demo-login'),
  getMe: () => api.get('/auth/me'),
};

// Profile Services
export const profileService = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
};

// Project Services
export const projectService = {
  getProjects: (params) => api.get('/projects', { params }),
  getProjectById: (id) => api.get(`/projects/${id}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
};

// Saved Projects
export const savedService = {
  getSavedProjects: () => api.get('/saved'),
  saveProject: (projectId, matchScore) => api.post(`/saved/${projectId}`, { matchScore }),
  removeSavedProject: (projectId) => api.delete(`/saved/${projectId}`),
};

// User Tracked Projects
export const userProjectService = {
  getUserProjects: () => api.get('/my-projects'),
  createUserProject: (data) => api.post('/my-projects', data),
  updateUserProject: (id, data) => api.put(`/my-projects/${id}`, data),
  deleteUserProject: (id) => api.delete(`/my-projects/${id}`),
};

// AI Services
export const aiService = {
  recommendProjects: (profileData) => api.post('/ai/recommend-projects', profileData),
  getProjectBlueprint: (projectId) => api.post('/ai/project-blueprint', { projectId }),
  getRoadmap: (data) => api.post('/ai/roadmap', data),
  getSkillGap: (projectId, userSkills) => api.post('/ai/skill-gap', { projectId, userSkills }),
  compareProjects: (projectIds) => api.post('/ai/compare', { projectIds }),
  getResumeBullet: (projectId) => api.post('/ai/resume-bullet', { projectId }),
  projectAssistant: (projectId, message, history) => api.post('/ai/project-assistant', { projectId, message, history }),
  buildCustomProject: (prompt) => api.post('/ai/project-builder', { prompt }),
  getUserRoadmaps: () => api.get('/ai/roadmaps'),
  updateRoadmapTask: (id, taskId, status) => api.put(`/ai/roadmaps/${id}/task`, { taskId, status }),
};

// System Health
export const systemService = {
  getHealth: () => api.get('/health'),
};

export default api;
