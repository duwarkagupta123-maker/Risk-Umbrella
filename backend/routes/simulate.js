const express = require('express');
const { body } = require('express-validator');
const { authenticateToken, validateRequest } = require('../middleware/auth');
const { runSimulation, GENERAL_EVENTS, LIFE_EVENTS } = require('../controllers/simulateController');

const router = express.Router();

router.use(authenticateToken);

const simulateValidators = [
  body('homeValue').isNumeric().withMessage('homeValue must be a number').toFloat(),
  body('carValue').isNumeric().withMessage('carValue must be a number').toFloat(),
  body('income').isNumeric().withMessage('income must be a number').toFloat(),
  body('dependents')
    .isInt({ min: 0 })
    .withMessage('dependents must be a non-negative integer')
    .toInt(),
  body('generalEvent')
    .isIn(GENERAL_EVENTS)
    .withMessage(`generalEvent must be one of: ${GENERAL_EVENTS.join(', ')}`),
  body('lifeEvent')
    .isIn(LIFE_EVENTS)
    .withMessage(`lifeEvent must be one of: ${LIFE_EVENTS.join(', ')}`),
];

router.post('/', simulateValidators, validateRequest, runSimulation);

module.exports = router;
