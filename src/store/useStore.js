import { create } from 'zustand'

export const useStore = create((set, get) => ({
  // ── Auth ──────────────────────────────────────────────────────────────────
  isLoggedIn: !!localStorage.getItem('ru_token'),
  token: localStorage.getItem('ru_token') || null,
  user: JSON.parse(localStorage.getItem('ru_user') || 'null'),

  // Computed display name: use backend user or fallback
  get userName() {
    return get().user?.name || 'Guest';
  },

  login: ({ token, user }) => {
    localStorage.setItem('ru_token', token);
    localStorage.setItem('ru_user', JSON.stringify(user));
    set({ isLoggedIn: true, token, user });
  },

  logout: () => {
    localStorage.removeItem('ru_token');
    localStorage.removeItem('ru_user');
    set({ isLoggedIn: false, token: null, user: null });
  },

  // ── Policies ──────────────────────────────────────────────────────────────
  // Seeded with one local fallback; replaced on first successful API load
  policies: [],
  setPolicies: (policies) => set({ policies }),

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
