/**
 * BACKEND INTEGRATION FILE
 * All calls go through the Vite dev-proxy (/api → http://localhost:5000/api).
 * In production, set VITE_API_BASE in your .env to the deployed backend URL.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE || '/api';

/** Retrieve the JWT stored at login */
function getToken() {
  return localStorage.getItem('ru_token');
}

/** Standard headers for protected routes */
function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

/** Throw a descriptive error for non-2xx responses */
async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // ── Authentication ────────────────────────────────────────────────────────

  /** POST /api/auth/login  →  { token, user } */
  login: async ({ email, password }) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  /** POST /api/auth/signup  →  { token, user } */
  signup: async ({ name, email, password }) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(res);
  },

  /** GET /api/user/me  →  { user } */
  getMe: async () => {
    const user = JSON.parse(localStorage.getItem('ru_user') || 'null');
    return { user: user || { name: 'Demo User', email: 'demo@example.com' } };
  },

  // ── Policies (MOCKED) ─────────────────────────────────────────────────────

  /** GET /api/policies  →  [ ...policies ] */
  getUserPolicies: async () => {
    return { policies: mockPolicies };
  },

  /** POST /api/policies  →  createdPolicy */
  createPolicy: async (policyData) => {
    const newPolicy = {
      ...policyData,
      _id: Math.random().toString(36).substring(2, 9),
      status: 'active'
    };
    mockPolicies.push(newPolicy);
    return newPolicy;
  },

  /** PUT /api/policies/:id  →  updatedPolicy */
  updatePolicy: async (id, policyData) => {
    const idx = mockPolicies.findIndex(p => p._id === id);
    if (idx >= 0) {
      mockPolicies[idx] = { ...mockPolicies[idx], ...policyData };
      return mockPolicies[idx];
    }
    throw new Error('Policy not found');
  },

  /** DELETE /api/policies/:id  →  { message } */
  deletePolicy: async (id) => {
    mockPolicies = mockPolicies.filter(p => p._id !== id);
    return { message: 'Deleted successfully' };
  },

  // ── Risk (MOCKED) ─────────────────────────────────────────────────────────

  /** GET /api/risk  →  risk analysis data */
  getRiskAnalysis: async () => {
    return {
      healthScore: 78,
      gaps: [
        { id: 'g1', type: 'flood', description: 'No Flood Coverage', patched: false }
      ]
    };
  },

  // ── Simulate (MOCKED) ─────────────────────────────────────────────────────

  runSimulation: async (simulationData) => {
    return {
      impact: 500000,
      covered: 400000,
      gap: 100000,
      message: 'Simulation completed based on mock data.'
    };
  },

  // ── Claims (MOCKED) ───────────────────────────────────────────────────────

  /** GET /api/claims → { claims } */
  getClaims: async () => {
    return { claims: mockClaims };
  },

  /** POST /api/claims  →  { success, claimId } */
  submitClaim: async (claimData) => {
    const newClaim = {
      ...claimData,
      id: 'CLM-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      status: 'Under Review',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    mockClaims.unshift(newClaim);
    return { success: true, claimId: newClaim.id, claim: newClaim };
  },
};

// Local state for mocks
let mockPolicies = [
  { _id: 'mock1', type: 'home', name: 'Grand Oak Residence', coverageAmount: 15000000, premium: 12500, exclusions: ['Earthquake', 'War'], status: 'active' },
  { _id: 'mock2', type: 'car', name: 'Tesla Model S Shield', coverageAmount: 8500000, premium: 4200, exclusions: ['Racing incidents'], status: 'active' },
  { _id: 'mock3', type: 'life', name: 'Premium Term Life', coverageAmount: 20000000, premium: 3800, exclusions: [], status: 'active' }
];

export let mockClaims = [
  { id: 'CLM-902341-B', title: 'Car Accident', date: 'Oct 12, 2024', status: 'Under Review', amount: 'Pending', icon: 'Car' }
];
