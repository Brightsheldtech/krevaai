import { create } from 'zustand'

export const useToolStore = create((set) => ({
  history: [],
  currentOutput: null,
  loading: false,
  error: null,
  setHistory: (history) => set({ history }),
  setCurrentOutput: (output) => set({ currentOutput: output }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearOutput: () => set({ currentOutput: null, error: null }),
  addToHistory: (entry) =>
    set((state) => ({ history: [entry, ...state.history].slice(0, 50) })),
}))
