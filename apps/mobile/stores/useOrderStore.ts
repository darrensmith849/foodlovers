import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Order } from '@foodlovers/types'
import { mmkvStorage } from './storage'

interface OrderState {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrder: (id: string) => Order | undefined
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    items: [
      { productId: 'p-001', productName: 'Full Cream Milk 2L', quantity: 2, unitPrice: 3499, budgetCategoryId: 'fresh-food', essentialityTier: 'ESSENTIAL' },
      { productId: 'p-004', productName: 'White Bread 700g', quantity: 1, unitPrice: 1699, budgetCategoryId: 'fresh-food', essentialityTier: 'ESSENTIAL' },
      { productId: 'p-010', productName: 'Chicken Breasts 1kg', quantity: 1, unitPrice: 8999, budgetCategoryId: 'proteins', essentialityTier: 'ESSENTIAL' },
    ],
    total: 17696,
    currencyCode: 'ZAR',
    status: 'delivered',
    createdAt: Date.now() - 86400000 * 3,
    deliveryAddress: { line1: '12 Main Road', city: 'Cape Town', province: 'Western Cape', postalCode: '8001', country: 'ZA' },
    budgetSnapshot: {
      total: 17696,
      currencyCode: 'ZAR',
      categoryBreakdown: [
        { budgetCategoryId: 'fresh-food', budgetCategoryName: 'Fresh Food', amount: 8697, percentage: 49, color: '#22C55E' },
        { budgetCategoryId: 'proteins', budgetCategoryName: 'Proteins', amount: 8999, percentage: 51, color: '#EF4444' },
      ],
      essentialTotal: 17696,
      discretionaryTotal: 0,
      semiEssentialTotal: 0,
      essentialPercentage: 100,
      discretionaryPercentage: 0,
      semiEssentialPercentage: 0,
      budgetRemaining: 332304,
      budgetUtilisation: 5,
      isOverBudget: false,
    },
  },
  {
    id: 'ord-002',
    items: [
      { productId: 'p-022', productName: "Lay's Chips 125g", quantity: 2, unitPrice: 2499, budgetCategoryId: 'snacks-treats', essentialityTier: 'DISCRETIONARY' },
      { productId: 'p-020', productName: 'Coca-Cola 2L', quantity: 1, unitPrice: 2499, budgetCategoryId: 'beverages', essentialityTier: 'DISCRETIONARY' },
      { productId: 'p-027', productName: 'Toilet Paper 9-pack', quantity: 1, unitPrice: 8999, budgetCategoryId: 'household', essentialityTier: 'ESSENTIAL' },
      { productId: 'p-006', productName: 'Bananas 1kg', quantity: 1, unitPrice: 2199, budgetCategoryId: 'fresh-food', essentialityTier: 'ESSENTIAL' },
    ],
    total: 18695,
    currencyCode: 'ZAR',
    status: 'delivered',
    createdAt: Date.now() - 86400000 * 1,
    deliveryAddress: { line1: '12 Main Road', city: 'Cape Town', province: 'Western Cape', postalCode: '8001', country: 'ZA' },
    budgetSnapshot: {
      total: 18695,
      currencyCode: 'ZAR',
      categoryBreakdown: [
        { budgetCategoryId: 'household', budgetCategoryName: 'Household', amount: 8999, percentage: 48, color: '#06B6D4' },
        { budgetCategoryId: 'snacks-treats', budgetCategoryName: 'Snacks & Treats', amount: 4998, percentage: 27, color: '#A855F7' },
        { budgetCategoryId: 'beverages', budgetCategoryName: 'Beverages', amount: 2499, percentage: 13, color: '#3B82F6' },
        { budgetCategoryId: 'fresh-food', budgetCategoryName: 'Fresh Food', amount: 2199, percentage: 12, color: '#22C55E' },
      ],
      essentialTotal: 11198,
      discretionaryTotal: 7497,
      semiEssentialTotal: 0,
      essentialPercentage: 60,
      discretionaryPercentage: 40,
      semiEssentialPercentage: 0,
      budgetRemaining: 313609,
      budgetUtilisation: 10,
      isOverBudget: false,
    },
  },
]

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: MOCK_ORDERS,
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      getOrder: (id) => get().orders.find((o) => o.id === id),
    }),
    {
      name: 'order-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
)
