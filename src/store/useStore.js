import { create } from 'zustand'
import { api } from '../api'

export const useStore = create((set, get) => ({
  // ── Auth ──────────────────────────────────────────────────────────────────
  isLoggedIn: !!localStorage.getItem('ru_token'),
  token: localStorage.getItem('ru_token') || null,
  user: JSON.parse(localStorage.getItem('ru_user') || 'null'),

  login: ({ token, user }) => {
    localStorage.setItem('ru_token', token);
    localStorage.setItem('ru_user', JSON.stringify(user));
    set({ isLoggedIn: true, token, user });
  },

  logout: () => {
    localStorage.removeItem('ru_token');
    localStorage.removeItem('ru_user');
    set({ isLoggedIn: false, token: null, user: null, policies: [] });
  },

  // ── Policies ──────────────────────────────────────────────────────────────
  policies: [
    { _id: 'mock_home_01', type: 'home', name: 'Grand Oak Residence Protect', coverageAmount: 15000000, premium: 12500, exclusions: ['Earthquake', 'War'], status: 'active' },
    { _id: 'mock_car_01', type: 'car', name: 'Tesla Model S Shield', coverageAmount: 8500000, premium: 4200, exclusions: ['Racing incidents'], status: 'active' },
    { _id: 'mock_life_01', type: 'life', name: 'Premium Term Life', coverageAmount: 20000000, premium: 3800, exclusions: [], status: 'active' }
  ],
  loading: false,
  error: null,

  fetchPolicies: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(r => setTimeout(r, 600)); // simulate network delay
      set((state) => ({ loading: false }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createPolicy: async (policyData) => {
    set({ loading: true, error: null });
    try {
      await new Promise(r => setTimeout(r, 800)); // simulate network delay
      const newPolicy = { 
        ...policyData, 
        _id: 'mock_pol_' + Math.random().toString(36).substr(2, 9),
        status: 'active' 
      };
      set((state) => ({ 
        policies: [...state.policies, newPolicy], 
        loading: false 
      }));
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  seedMockData: async () => {
    set({ loading: true, error: null });
    try {
      const mocks = [
        { type: 'home', name: 'Grand Oak Residence', coverageAmount: 15000000, premium: 12500, exclusions: ['Earthquake', 'War'], status: 'active' },
        { type: 'car', name: 'Tesla Model S Shield', coverageAmount: 8500000, premium: 4200, exclusions: ['Racing incidents'], status: 'active' },
        { type: 'life', name: 'Premium Term Life', coverageAmount: 20000000, premium: 3800, exclusions: [], status: 'active' }
      ];
      
      for (const mock of mocks) {
        await api.createPolicy(mock);
      }
      
      const data = await api.getUserPolicies();
      set({ policies: data.policies || [], loading: false, healthScore: 92 });
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  // ── Health / Gaps ─────────────────────────────────────────────────────────
  healthScore: 75,

  gaps: [
    { id: 'g1', type: 'flood', patched: false },
    { id: 'g2', type: 'disability', patched: false },
  ],

  patchGap: (id) =>
    set((state) => {
      const updatedGaps = state.gaps.map((g) =>
        g.id === id ? { ...g, patched: true } : g
      );
      const unpatchedCount = updatedGaps.filter((g) => !g.patched).length;
      return {
        gaps: updatedGaps,
        healthScore: 100 - unpatchedCount * 12.5,
      };
    }),
}));
