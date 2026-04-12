const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SALT_ROUNDS = 10;
const JWT_EXPIRES = '7d';

/**
 * Build JWT for a user id.
 * @param {string} userId
 */
function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

/**
 * Public user shape (no password).
 * @param {import('mongoose').Document} user
 */
function toPublicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

/**
 * POST /api/auth/signup
 */
async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const token = signToken(user._id.toString());

    return res.status(201).json({
      token,
      user: toPublicUser(user),
    });
  } catch (err) {
    console.error('signup error:', err);
    return res.status(500).json({ message: 'Server error during signup.' });
  }
}

/**
 * POST /api/auth/login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = signToken(user._id.toString());
    user.password = undefined;

    return res.json({
      token,
      user: toPublicUser(user),
    });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Server error during login.' });
  }
}

/**
 * GET /api/user/me
 */
async function getMe(req, res) {
  try {
    return res.json({ user: toPublicUser(req.user) });
  } catch (err) {
    console.error('getMe error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
}

module.exports = {
  signup,
  login,
  getMe,
  signToken,
  toPublicUser,
};
