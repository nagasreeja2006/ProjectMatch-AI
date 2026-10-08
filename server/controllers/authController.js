const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbService = require('../services/dbService');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'projectmatch_ai_super_secret_jwt_key_2026_dev';
  return jwt.sign({ id }, secret, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, education } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const existingUser = await dbService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'A user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await dbService.createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      education: education || 'BTech',
      skills: [],
      interests: [],
      careerGoal: 'Full Stack Developer',
      difficultyPreference: 'Medium',
      availableTime: '1 month',
      projectPurpose: 'Resume'
    });

    const token = generateToken(newUser._id || newUser.id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: newUser._id || newUser.id,
        name: newUser.name,
        email: newUser.email,
        education: newUser.education,
        year: newUser.year,
        branch: newUser.branch,
        skills: newUser.skills || [],
        interests: newUser.interests || [],
        careerGoal: newUser.careerGoal,
        difficultyPreference: newUser.difficultyPreference,
        availableTime: newUser.availableTime,
        projectPurpose: newUser.projectPurpose
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await dbService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id || user.id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        education: user.education,
        year: user.year,
        branch: user.branch,
        skills: user.skills || [],
        interests: user.interests || [],
        careerGoal: user.careerGoal,
        difficultyPreference: user.difficultyPreference,
        availableTime: user.availableTime,
        projectPurpose: user.projectPurpose,
        isDemoUser: !!user.isDemoUser
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    One-click Demo User Login
// @route   POST /api/auth/demo-login
const demoLogin = async (req, res, next) => {
  try {
    let demoUser = await dbService.findUserByEmail('demo@projectmatch.ai');
    if (!demoUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      demoUser = await dbService.createUser({
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
        isDemoUser: true
      });
    }

    const token = generateToken(demoUser._id || demoUser.id);

    res.status(200).json({
      success: true,
      message: 'Logged in as Demo Student',
      token,
      user: {
        id: demoUser._id || demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        education: demoUser.education,
        year: demoUser.year,
        branch: demoUser.branch,
        skills: demoUser.skills || [],
        interests: demoUser.interests || [],
        careerGoal: demoUser.careerGoal,
        difficultyPreference: demoUser.difficultyPreference,
        availableTime: demoUser.availableTime,
        projectPurpose: demoUser.projectPurpose,
        isDemoUser: true
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const user = await dbService.findUserById(req.user._id || req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, demoLogin, getMe };
