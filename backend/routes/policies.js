const express = require('express');
const { body, param } = require('express-validator');
const { authenticateToken, validateRequest } = require('../middleware/auth');
const {
  listPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy,
} = require('../controllers/policyController');

const router = express.Router();

// All policy routes require authentication
router.use(authenticateToken);

const policyTypeValues = ['home', 'car', 'life'];
const statusValues = ['active', 'expired'];

const createValidators = [
  body('type')
    .isIn(policyTypeValues)
    .withMessage(`type must be one of: ${policyTypeValues.join(', ')}`),
  body('name').trim().notEmpty().withMessage('name is required'),
  body('coverageAmount')
    .isNumeric()
    .withMessage('coverageAmount must be a number')
    .toFloat(),
  body('exclusions').optional().isArray().withMessage('exclusions must be an array'),
  body('premium').isNumeric().withMessage('premium must be a number').toFloat(),
  body('status').optional().isIn(statusValues).withMessage('invalid status'),
];

const updateValidators = [
  param('id').isMongoId().withMessage('Invalid policy id'),
  body('type').optional().isIn(policyTypeValues),
  body('name').optional().trim().notEmpty(),
  body('coverageAmount').optional().isNumeric().toFloat(),
  body('exclusions').optional().isArray(),
  body('premium').optional().isNumeric().toFloat(),
  body('status').optional().isIn(statusValues),
];

const idParam = [param('id').isMongoId().withMessage('Invalid policy id')];

router.get('/', listPolicies);
router.post('/', createValidators, validateRequest, createPolicy);
router.put('/:id', updateValidators, validateRequest, updatePolicy);
router.delete('/:id', idParam, validateRequest, deletePolicy);

module.exports = router;
