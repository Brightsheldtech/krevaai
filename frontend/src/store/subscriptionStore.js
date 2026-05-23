import { create } from 'zustand'

export const PLAN_LIMITS = {
  free: { type: 'daily', limit: 5, label: 'Free' },
  starter: { type: 'monthly', limit: 200, label: 'Starter' },
  pro: { type: 'monthly', limit: Infinity, label: 'Pro' },
}

export const useSubscriptionStore = create((set) => ({
  plan: 'free',
  usage: { used: 0, limit: 5 },
  subscription: null,
  setPlan: (plan) => set({ plan }),
  setUsage: (usage) => set({ usage }),
  setSubscription: (subscription) => set({ subscription }),
}))
