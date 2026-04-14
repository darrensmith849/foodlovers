import { create } from 'zustand'
import type { Market, Address } from '@foodlovers/types'

interface UserState {
  id: string
  name: string
  phone: string
  email: string
  market: Market
  currencyCode: string
  currencySymbol: string
  defaultAddress: Address | null
  monthlyBudget: number
  hasCompletedOnboarding: boolean
  setMonthlyBudget: (amount: number) => void
  completeOnboarding: () => void
  setMarket: (market: Market) => void
}

export const useUserStore = create<UserState>((set) => ({
  id: 'user-001',
  name: 'Daniel',
  phone: '+27 82 000 0000',
  email: 'daniel@example.com',
  market: 'ZA',
  currencyCode: 'ZAR',
  currencySymbol: 'R',
  defaultAddress: {
    line1: '12 Main Road',
    city: 'Cape Town',
    province: 'Western Cape',
    postalCode: '8001',
    country: 'ZA',
  },
  monthlyBudget: 350000,
  hasCompletedOnboarding: false,
  setMonthlyBudget: (amount) => set({ monthlyBudget: amount }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  setMarket: (market) =>
    set({
      market,
      currencyCode: market === 'ZA' ? 'ZAR' : 'USD',
      currencySymbol: market === 'ZA' ? 'R' : '$',
    }),
}))
