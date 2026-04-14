import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, CartBudgetBreakdown, BudgetWarning } from '@foodlovers/types'
import { calculateCartBudget, generateWarnings } from '@foodlovers/budgeting-engine'
import { PRODUCTS, BUDGET_CATEGORIES } from '@foodlovers/mock-data'
import { useUserStore } from './useUserStore'
import { useBudgetStore } from './useBudgetStore'
import { mmkvStorage } from './storage'

const productMap = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]))
const categoryMap = Object.fromEntries(BUDGET_CATEGORIES.map((c) => [c.id, c]))

interface CartState {
  items: CartItem[]
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getBreakdown: () => CartBudgetBreakdown
  getWarnings: () => BudgetWarning[]
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
              ),
            }
          }
          return {
            items: [...state.items, { productId, quantity, addedAt: Date.now() }],
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.productId !== productId) }
          }
          return {
            items: state.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
          }
        }),

      clearCart: () => set({ items: [] }),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getBreakdown: () => {
        const { monthlyBudget } = useUserStore.getState()
        const { currentMonthSpend } = useBudgetStore.getState()
        return calculateCartBudget({
          items: get().items,
          products: productMap,
          budgetCategories: categoryMap,
          monthlyLimit: monthlyBudget,
          currentMonthSpend,
        })
      },

      getWarnings: () => {
        const breakdown = get().getBreakdown()
        const { monthlyBudget } = useUserStore.getState()
        const { spendHistory } = useBudgetStore.getState()
        return generateWarnings({
          breakdown,
          monthlyHistory: spendHistory,
          monthlyLimit: monthlyBudget,
        })
      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)
