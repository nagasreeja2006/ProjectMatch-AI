const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  domain: { type: String, required: true }, // e.g., AI/ML, Web Development, Cloud Computing, Cybersecurity
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard', 'Advanced'], 
    required: true 
  },
  technologies: [{ type: String, required: true }],
  requiredSkills: [{ type: String, required: true }],
  optionalSkills: [{ type: String }],
  estimatedTime: { type: String, required: true }, // e.g. "2 weeks", "1 month", "2-3 months"
  projectType: { type: String, default: 'Major Project' },
  careerGoals: [{ type: String }], // Matches target careers
  features: [{ type: String }],
  learningOutcomes: [{ type: String }],
  resumeValue: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'High' 
  },
  popularity: { type: Number, default: 80, min: 0, max: 100 },
  prerequisites: [{ type: String }],
  blueprint: { type: mongoose.Schema.Types.Mixed, default: null }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
