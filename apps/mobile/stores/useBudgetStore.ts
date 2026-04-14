import { create } from 'zustand'
import type { MonthlySpend } from '@foodlovers/types'

interface BudgetState {
  currentMonthSpend: number
  currentMonth: string
  categorySpend: Record<string, number>
  essentialSpend: number
  discretionarySpend: number
  orderCount: number
  spendHistory: MonthlySpend[]
  addOrderSpend: (total: number, categories: Record<string, number>, essential: number, discretionary: number) => void
}

export const useBudgetStore = create<BudgetState>((set) => ({
  currentMonthSpend: 42000,
  currentMonth: '2026-04',
  categorySpend: {
    'fresh-food': 15200,
    'proteins': 8999,
    'snacks-treats': 7497,
    'household': 5998,
    'beverages': 2999,
    'personal-care': 1307,
  },
  essentialSpend: 23998,
  discretionarySpend: 10496,
  orderCount: 3,
  spendHistory: [
    {
      userId: 'user-001',
      month: '2026-03',
      totalSpend: 280000,
      categorySpend: {
        'fresh-food': 84000,
        'proteins': 56000,
        'pantry-staples': 42000,
        'household': 39200,
        'beverages': 28000,
        'snacks-treats': 19600,
        'personal-care': 11200,
      },
      essentialSpend: 168000,
      discretionarySpend: 47600,
      orderCount: 8,
    },
    {
      userId: 'user-001',
      month: '2026-02',
      totalSpend: 310000,
      categorySpend: {
        'fresh-food': 93000,
        'proteins': 62000,
        'pantry-staples': 46500,
        'household': 37200,
        'snacks-treats': 34100,
        'beverages': 24800,
        'personal-care': 12400,
      },
      essentialSpend: 176700,
      discretionarySpend: 58900,
      orderCount: 9,
    },
  ],

  addOrderSpend: (total, categories, essential, discretionary) =>
    set((state) => {
      const newCategorySpend = { ...state.categorySpend }
      for (const [catId, amount] of Object.entries(categories)) {
        newCategorySpend[catId] = (newCategorySpend[catId] ?? 0) + amount
      }
      return {
        currentMonthSpend: state.currentMonthSpend + total,
        categorySpend: newCategorySpend,
        essentialSpend: state.essentialSpend + essential,
        discretionarySpend: state.discretionarySpend + discretionary,
        orderCount: state.orderCount + 1,
      }
    }),
}))
