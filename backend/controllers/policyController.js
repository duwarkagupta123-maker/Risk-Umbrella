const Policy = require('../models/Policy');

const ALLOWED_TYPES = ['home', 'car', 'life'];
const ALLOWED_STATUS = ['active', 'expired'];

/**
 * GET /api/policies
 */
async function listPolicies(req, res) {
  try {
    const policies = await Policy.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ policies });
  } catch (err) {
    console.error('listPolicies error:', err);
    return res.status(500).json({ message: 'Failed to fetch policies.' });
  }
}

/**
 * POST /api/policies
 */
async function createPolicy(req, res) {
  try {
    const { type, name, coverageAmount, exclusions, premium, status } = req.body;

    const policy = await Policy.create({
      user: req.user._id,
      type,
      name: name.trim(),
      coverageAmount: Number(coverageAmount),
      exclusions: Array.isArray(exclusions) ? exclusions : [],
      premium: Number(premium),
      status: status && ALLOWED_STATUS.includes(status) ? status : 'active',
    });

    return res.status(201).json({ policy });
  } catch (err) {
    console.error('createPolicy error:', err);
    return res.status(500).json({ message: 'Failed to create policy.' });
  }
}

/**
 * PUT /api/policies/:id
 */
async function updatePolicy(req, res) {
  try {
    const policy = await Policy.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!policy) {
      return res.status(404).json({ message: 'Policy not found.' });
    }

    const { type, name, coverageAmount, exclusions, premium, status } = req.body;

    if (type !== undefined) {
      if (!ALLOWED_TYPES.includes(type)) {
        return res.status(400).json({ message: 'Invalid policy type.' });
      }
      policy.type = type;
    }
    if (name !== undefined) policy.name = String(name).trim();
    if (coverageAmount !== undefined) policy.coverageAmount = Number(coverageAmount);
    if (exclusions !== undefined) {
      policy.exclusions = Array.isArray(exclusions) ? exclusions : [];
    }
    if (premium !== undefined) policy.premium = Number(premium);
    if (status !== undefined) {
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({ message: 'Invalid status.' });
      }
      policy.status = status;
    }

    await policy.save();
    return res.json({ policy });
  } catch (err) {
    console.error('updatePolicy error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid policy id.' });
    }
    return res.status(500).json({ message: 'Failed to update policy.' });
  }
}

/**
 * DELETE /api/policies/:id
 */
async function deletePolicy(req, res) {
  try {
    const result = await Policy.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!result) {
      return res.status(404).json({ message: 'Policy not found.' });
    }

    return res.json({ message: 'Policy deleted.', id: result._id.toString() });
  } catch (err) {
    console.error('deletePolicy error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid policy id.' });
    }
    return res.status(500).json({ message: 'Failed to delete policy.' });
  }
}

module.exports = {
  listPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy,
};
