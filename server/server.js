const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from root or local .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const { connectDB, getDBStatus } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const savedRoutes = require('./routes/savedRoutes');
const userProjectRoutes = require('./routes/userProjectRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin like mobile apps, curl, postman
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.endsWith('.netlify.app') ||
      process.env.NODE_ENV !== 'production'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing with safe size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health & System Info Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    appName: 'ProjectMatch AI Backend',
    timestamp: new Date().toISOString(),
    database: getDBStatus() ? 'MongoDB Connected' : 'Embedded In-Memory Store Active',
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '')
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/my-projects', userProjectRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(`  🚀 ProjectMatch AI Server running on port ${PORT}`);
    console.log(`  🌐 Health check: http://localhost:${PORT}/api/health`);
    console.log(`  🛡️ Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(`===============================================`);
  });
  // Connect to DB asynchronously without blocking server readiness
  connectDB();
};

startServer();

module.exports = app;
