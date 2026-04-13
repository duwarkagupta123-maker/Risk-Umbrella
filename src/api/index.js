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
    const res = await fetch(`${API_BASE_URL}/user/me`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // ── Policies ──────────────────────────────────────────────────────────────

  /** GET /api/policies  →  [ ...policies ] */
  getUserPolicies: async () => {
    const res = await fetch(`${API_BASE_URL}/policies`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  /** POST /api/policies  →  createdPolicy */
  createPolicy: async (policyData) => {
    const res = await fetch(`${API_BASE_URL}/policies`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(policyData),
    });
    return handleResponse(res);
  },

  /** PUT /api/policies/:id  →  updatedPolicy */
  updatePolicy: async (id, policyData) => {
    const res = await fetch(`${API_BASE_URL}/policies/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(policyData),
    });
    return handleResponse(res);
  },

  /** DELETE /api/policies/:id  →  { message } */
  deletePolicy: async (id) => {
    const res = await fetch(`${API_BASE_URL}/policies/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // ── Risk ──────────────────────────────────────────────────────────────────

  /** GET /api/risk  →  risk analysis data */
  getRiskAnalysis: async () => {
    const res = await fetch(`${API_BASE_URL}/risk`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // ── Simulate ──────────────────────────────────────────────────────────────

  /**
   * POST /api/simulate
   * Body: { homeValue, carValue, income, dependents, generalEvent, lifeEvent }
   * →  simulation results
   */
  runSimulation: async (simulationData) => {
    const res = await fetch(`${API_BASE_URL}/simulate`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(simulationData),
    });
    return handleResponse(res);
  },

  // ── Claims ────────────────────────────────────────────────────────────────

  /** POST /api/claims  →  { success, claimId } */
  submitClaim: async (claimData) => {
    const res = await fetch(`${API_BASE_URL}/claims`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(claimData),
    });
    return handleResponse(res);
  },
};
