const { getRiskForPin } = require('../utils/riskData');

/**
 * GET /api/risk/:pin
 * Returns flood, theft, wildfire scores (0–1) for an Indian PIN code.
 */
async function getRiskByPin(req, res) {
  try {
    const { pin } = req.params;
    const scores = getRiskForPin(pin);

    // API contract: { flood, theft, wildfire } — numbers between 0 and 1
    return res.json({
      flood: scores.flood,
      theft: scores.theft,
      wildfire: scores.wildfire,
    });
  } catch (err) {
    console.error('getRiskByPin error:', err);
    return res.status(500).json({ message: 'Failed to fetch risk data.' });
  }
}

module.exports = { getRiskByPin };
