const mongoose = require('mongoose');

const savedProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  matchScore: { type: Number, default: 85 },
  status: { 
    type: String, 
    enum: ['Saved', 'Under Consideration', 'Started'], 
    default: 'Saved' 
  },
  notes: { type: String, default: '' },
}, {
  timestamps: true,
});

savedProjectSchema.index({ userId: 1, projectId: 1 }, { unique: true });

module.exports = mongoose.model('SavedProject', savedProjectSchema);
