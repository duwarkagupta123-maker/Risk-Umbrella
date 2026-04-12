import { create } from 'zustand'

export const useStore = create((set) => ({
  isLoggedIn: false,
  userName: 'Rajesh Kumar',
  healthScore: 75,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  
  // Policies mock data
  policies: [
    {
      id: 'p1',
      name: 'My Home Policy',
      limit: 750000,
      liability: 1000000,
      premium: 1840,
      type: 'Property',
      status: 'active'
    }
  ],
  
  // Gaps
  gaps: [
    { id: 'g1', type: 'flood', patched: false },
    { id: 'g2', type: 'disability', patched: false }
  ],
  
  patchGap: (id) => set((state) => {
    const updatedGaps = state.gaps.map(g => g.id === id ? { ...g, patched: true } : g);
    const unpatchedCount = updatedGaps.filter(g => !g.patched).length;
    // Calculate new health score (max 100, each gap costs 12.5)
    return {
      gaps: updatedGaps,
      healthScore: 100 - (unpatchedCount * 12.5)
    }
  })
}))
