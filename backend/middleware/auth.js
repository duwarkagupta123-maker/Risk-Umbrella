const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

/**
 * Verifies JWT from `Authorization: Bearer <token>` and attaches the user document to `req.user`.
 * Password field is excluded from the loaded user.
 */
async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not set');
      return res.status(500).json({ message: 'Server configuration error.' });
    }

    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId || decoded.sub || decoded.id;
    if (!userId) {
      return res.status(403).json({ message: 'Invalid token payload.' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(403).json({ message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expired.' });
    }
    return res.status(403).json({ message: 'Invalid token.' });
  }
}

/**
 * Sends 400 if express-validator checks failed (use after validator chains).
 */
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }
  next();
}

module.exports = { authenticateToken, validateRequest };
