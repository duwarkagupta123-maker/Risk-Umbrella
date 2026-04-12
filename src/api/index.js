/**
 * BACKEND INTEGRATION FILE
 * 
 * You can replace the mock responses in these functions with real `fetch` or `axios` calls 
 * when your backend API is ready!
 */

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Authentication
  login: async (credentials) => {
    // Example for your future backend:
    // const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials)
    // });
    // return response.json();
    
    // Returning mock data for now
    return new Promise(resolve => setTimeout(() => resolve({ token: 'mock-jwt-token', user: { name: 'Rajesh Kumar', id: 'u1' } }), 500));
  },

  // Fetch Policies
  getUserPolicies: async () => {
    // const response = await fetch(`${API_BASE_URL}/policies`);
    // return response.json();
    
    // Returning mock data for now
    return new Promise(resolve => setTimeout(() => resolve([
      { id: 'p1', name: 'My Home Policy', premium: 1840, type: 'Property' }
    ]), 500));
  },

  // File Claim
  submitClaim: async (claimData) => {
    // const response = await fetch(`${API_BASE_URL}/claims`, {
    //   method: 'POST',
    //   body: JSON.stringify(claimData)
    // });
    // return response.json();
    console.log("Submitting claim to backend...", claimData);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, claimId: 'CLM-' + Math.floor(Math.random() * 10000) }), 800));
  }
};
