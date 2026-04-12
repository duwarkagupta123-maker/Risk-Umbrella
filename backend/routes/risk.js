const express = require('express');
const { param } = require('express-validator');
const { validateRequest } = require('../middleware/auth');
const { getRiskByPin } = require('../controllers/riskController');

const router = express.Router();

/**
 * Indian PIN codes are typically 6 digits; we accept any string and normalize in the controller.
 */
router.get(
  '/:pin',
  [param('pin').notEmpty().withMessage('PIN is required')],
  validateRequest,
  getRiskByPin
);

module.exports = router;
