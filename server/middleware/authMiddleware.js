const jwt = require('jsonwebtoken');
const dbService = require('../services/dbService');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'projectmatch_ai_super_secret_jwt_key_2026_dev';
    const decoded = jwt.verify(token, secret);
    const user = await dbService.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
  }
};

const optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'projectmatch_ai_super_secret_jwt_key_2026_dev';
      const decoded = jwt.verify(token, secret);
      const user = await dbService.findUserById(decoded.id);
      if (user) req.user = user;
    } catch (e) {
      // Ignore invalid token in optional auth
    }
  }
  next();
};

module.exports = { protect, optionalAuth };
