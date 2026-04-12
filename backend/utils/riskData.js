/**
 * Mock risk scores (0–1) for Indian PIN codes.
 * Used by GET /api/risk/:pin for hackathon / demo purposes.
 * PINs not in this map fall back to moderate defaults (0.5, 0.5, 0.5).
 */

/** @type {Record<string, { flood: number; theft: number; wildfire: number }>} */
const PIN_RISK_MAP = {
  // Specified baseline cities
  '400001': { flood: 0.8, theft: 0.3, wildfire: 0.1 }, // Mumbai
  '110001': { flood: 0.2, theft: 0.7, wildfire: 0.1 }, // Delhi
  '560001': { flood: 0.3, theft: 0.4, wildfire: 0.6 }, // Bangalore
  '700001': { flood: 0.9, theft: 0.4, wildfire: 0.1 }, // Kolkata
  '600001': { flood: 0.7, theft: 0.3, wildfire: 0.2 }, // Chennai

  // Additional demo PINs (top urban / regional centers)
  '400053': { flood: 0.75, theft: 0.35, wildfire: 0.12 },
  '400071': { flood: 0.72, theft: 0.38, wildfire: 0.11 },
  '411001': { flood: 0.45, theft: 0.42, wildfire: 0.15 },
  '411004': { flood: 0.42, theft: 0.45, wildfire: 0.14 },
  '500001': { flood: 0.35, theft: 0.48, wildfire: 0.22 },
  '500032': { flood: 0.33, theft: 0.5, wildfire: 0.24 },
  '380001': { flood: 0.25, theft: 0.55, wildfire: 0.18 },
  '382001': { flood: 0.28, theft: 0.52, wildfire: 0.2 },
  '302001': { flood: 0.2, theft: 0.35, wildfire: 0.45 },
  '226001': { flood: 0.55, theft: 0.4, wildfire: 0.25 },
  '122001': { flood: 0.15, theft: 0.65, wildfire: 0.2 },
  '160001': { flood: 0.12, theft: 0.4, wildfire: 0.35 },
  '144001': { flood: 0.35, theft: 0.38, wildfire: 0.3 },
  '800001': { flood: 0.78, theft: 0.45, wildfire: 0.08 },
  '492001': { flood: 0.5, theft: 0.42, wildfire: 0.55 },
  '751001': { flood: 0.62, theft: 0.36, wildfire: 0.28 },
  '682001': { flood: 0.58, theft: 0.32, wildfire: 0.4 },
  '695001': { flood: 0.48, theft: 0.3, wildfire: 0.52 },
  '180001': { flood: 0.22, theft: 0.28, wildfire: 0.65 },
  '781001': { flood: 0.85, theft: 0.25, wildfire: 0.35 },
  '440001': { flood: 0.4, theft: 0.33, wildfire: 0.58 },
  '834001': { flood: 0.65, theft: 0.5, wildfire: 0.45 },
  '641001': { flood: 0.52, theft: 0.28, wildfire: 0.48 },
  '682003': { flood: 0.55, theft: 0.34, wildfire: 0.42 },
  '560076': { flood: 0.32, theft: 0.41, wildfire: 0.58 },
  '600040': { flood: 0.68, theft: 0.32, wildfire: 0.18 },
};

const MODERATE = { flood: 0.5, theft: 0.5, wildfire: 0.5 };

/**
 * Normalize PIN to 6-digit string and return risk scores.
 * @param {string} pin
 * @returns {{ flood: number; theft: number; wildfire: number }}
 */
function getRiskForPin(pin) {
  const normalized = String(pin).replace(/\D/g, '').slice(0, 6);
  if (normalized.length !== 6) {
    return { ...MODERATE };
  }
  return PIN_RISK_MAP[normalized] ? { ...PIN_RISK_MAP[normalized] } : { ...MODERATE };
}

module.exports = {
  PIN_RISK_MAP,
  MODERATE,
  getRiskForPin,
};
