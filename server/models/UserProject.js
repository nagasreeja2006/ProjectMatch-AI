const mongoose = require('mongoose');

const userProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  technologies: [{ type: String }],
  domain: { type: String, default: 'Web Development' },
  difficulty: { type: String, default: 'Medium' },
  status: { 
    type: String, 
    enum: ['Idea', 'Planning', 'In Progress', 'Completed'], 
    default: 'Planning' 
  },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  tasksTotal: { type: Number, default: 0 },
  tasksCompleted: { type: Number, default: 0 },
  startDate: { type: Date, default: Date.now },
  targetDate: { type: Date },
  githubUrl: { type: String, default: '' },
  demoUrl: { type: String, default: '' },
  notes: { type: String, default: '' },
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', default: null },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserProject', userProjectSchema);
