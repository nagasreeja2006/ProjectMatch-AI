const mongoose = require('mongoose');

const recommendationItemSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  matchScore: { type: Number, required: true },
  reason: { type: String, default: '' },
  skillMatch: { type: Number, default: 0 },
  careerMatch: { type: Number, default: 0 },
  difficultyMatch: { type: Number, default: 0 },
  timeMatch: { type: Number, default: 0 },
  interestMatch: { type: Number, default: 0 },
}, { _id: false });

const recommendationHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profileSnapshot: { type: mongoose.Schema.Types.Mixed },
  recommendations: [recommendationItemSchema],
  isAiGenerated: { type: Boolean, default: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('RecommendationHistory', recommendationHistorySchema);
