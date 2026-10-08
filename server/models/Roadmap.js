const mongoose = require('mongoose');

const roadmapTaskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  week: { type: Number, default: 1 },
  day: { type: String, default: 'Day 1' },
  estimatedHours: { type: Number, default: 4 },
  dependencies: [{ type: String }],
  status: { 
    type: String, 
    enum: ['Not Started', 'In Progress', 'Completed'], 
    default: 'Not Started' 
  },
}, { _id: false });

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
  projectTitle: { type: String, required: true },
  tasks: [roadmapTaskSchema],
  totalTasks: { type: Number, default: 0 },
  completedTasks: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  estimatedWeeks: { type: Number, default: 4 },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
