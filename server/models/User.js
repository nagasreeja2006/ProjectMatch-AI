const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'], 
    default: 'Intermediate' 
  },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  education: { 
    type: String, 
    enum: ['Diploma', 'BTech', 'BE', 'BCA', 'MCA', 'Degree', 'Other'],
    default: 'BTech' 
  },
  year: { type: String, default: '3rd Year' },
  branch: { 
    type: String, 
    enum: ['CSE', 'AIML', 'AI', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'],
    default: 'CSE' 
  },
  skills: [skillSchema],
  interests: [{ type: String }],
  careerGoal: { 
    type: String, 
    default: 'Full Stack Developer' 
  },
  difficultyPreference: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard', 'Advanced'], 
    default: 'Medium' 
  },
  availableTime: { 
    type: String, 
    enum: ['1 week', '2 weeks', '1 month', '2-3 months', '3+ months'], 
    default: '1 month' 
  },
  projectPurpose: { 
    type: String, 
    enum: ['College Mini Project', 'Major Project', 'Resume', 'Internship', 'Hackathon', 'Learning', 'Startup'], 
    default: 'Resume' 
  },
  isDemoUser: { type: Boolean, default: false }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
