const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/auth');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

/**
 * Validation rules for signup.
 */
const signupValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

/**
 * Validation rules for login.
 */
const loginValidators = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/signup', signupValidators, validateRequest, signup);
router.post('/login', loginValidators, validateRequest, login);

module.exports = router;
