const Simulation = require('../models/Simulation');

const GENERAL_EVENTS = ['car-crash', 'house-fire', 'medical'];
const LIFE_EVENTS = ['disability', 'critical-illness', 'death'];

/**
 * Compute simulation impact per product spec.
 */
function computeSimulation(body) {
  const {
    homeValue = 0,
    carValue = 0,
    income = 0,
    dependents = 0,
    generalEvent = 'medical',
    lifeEvent = 'critical-illness',
  } = body;

  let repairCost;
  if (generalEvent === 'car-crash') {
    repairCost = carValue * 0.3;
  } else if (generalEvent === 'house-fire') {
    repairCost = homeValue * 0.2;
  } else {
    repairCost = 50000;
  }

  let incomeLoss;
  if (lifeEvent === 'disability') {
    incomeLoss = income * 0.6;
  } else if (lifeEvent === 'death') {
    incomeLoss = income * 10;
  } else {
    incomeLoss = income * 0.8;
  }

  // Fixed demo value per spec; optional richer formula commented in code
  const collegeFundImpact = 40;
  // Optional: Math.min(100, Math.round((income / 100000) * dependents));

  const outOfPocket = repairCost + incomeLoss;

  return {
    repairCost: Math.round(repairCost),
    incomeLoss: Math.round(incomeLoss),
    collegeFundImpact,
    outOfPocket: Math.round(outOfPocket),
  };
}

/**
 * POST /api/simulate
 */
async function runSimulation(req, res) {
  try {
    const {
      homeValue,
      carValue,
      income,
      dependents,
      generalEvent,
      lifeEvent,
    } = req.body;

    const results = computeSimulation({
      homeValue,
      carValue,
      income,
      dependents,
      generalEvent,
      lifeEvent,
    });

    // Persist run for authenticated user (history)
    await Simulation.create({
      user: req.user._id,
      homeValue,
      carValue,
      income,
      dependents,
      generalEvent,
      lifeEvent,
      results,
    });

    return res.json(results);
  } catch (err) {
    console.error('runSimulation error:', err);
    return res.status(500).json({ message: 'Simulation failed.' });
  }
}

module.exports = {
  runSimulation,
  computeSimulation,
  GENERAL_EVENTS,
  LIFE_EVENTS,
};
