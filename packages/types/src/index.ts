// ─── Market & Currency ───────────────────────────────────────

export type Market = 'ZA' | 'ZW'

export interface MarketConfig {
  market: Market
  currencyCode: string
  currencySymbol: string
  locale: string
}

// ─── Product Taxonomy ────────────────────────────────────────

export type EssentialityTier = 'ESSENTIAL' | 'SEMI_ESSENTIAL' | 'DISCRETIONARY'

export interface RetailCategory {
  id: string
  name: string
  iconName: string
  sortOrder: number
  defaultBudgetCategoryId: string
  defaultEssentialityTier: EssentialityTier
}

export interface BudgetCategory {
  id: string
  name: string
  color: string
  iconName: string
}

// ─── Product ─────────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  currencyCode: string
  market: Market
  unit: string
  retailCategoryId: string
  budgetCategoryId: string
  essentialityTier: EssentialityTier
  inStock: boolean
  storeId: string
}

// ─── Cart ────────────────────────────────────────────────────

export interface CartItem {
  productId: string
  quantity: number
  addedAt: number
}

export interface Cart {
  items: CartItem[]
  updatedAt: number
}

// ─── Budget Breakdown ────────────────────────────────────────

export interface CategorySpend {
  budgetCategoryId: string
  budgetCategoryName: string
  amount: number
  percentage: number
  color: string
}

export interface CartBudgetBreakdown {
  total: number
  currencyCode: string
  categoryBreakdown: CategorySpend[]
  essentialTotal: number
  discretionaryTotal: number
  semiEssentialTotal: number
  essentialPercentage: number
  discretionaryPercentage: number
  semiEssentialPercentage: number
  budgetRemaining: number
  budgetUtilisation: number
  isOverBudget: boolean
}

export type WarningType =
  | 'OVER_MONTHLY_BUDGET'
  | 'CATEGORY_SPIKE'
  | 'HIGH_DISCRETIONARY'
  | 'SINGLE_CATEGORY_DOMINANT'
  | 'BUDGET_ON_TRACK'

export interface BudgetWarning {
  type: WarningType
  message: string
  severity: 'info' | 'caution' | 'warning'
  categoryId?: string
}

// ─── Order ───────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'confirmed' | 'picking' | 'delivering' | 'delivered'

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  budgetCategoryId: string
  essentialityTier: EssentialityTier
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  currencyCode: string
  status: OrderStatus
  createdAt: number
  deliveryAddress: Address
  budgetSnapshot: CartBudgetBreakdown
}

// ─── User & Budget ───────────────────────────────────────────

export interface User {
  id: string
  name: string
  phone: string
  email?: string
  defaultAddress?: Address
  market: Market
  currencyCode: string
  createdAt: number
}

export interface UserBudget {
  userId: string
  monthlyLimit: number
  categoryTargets?: Record<string, number>
}

export interface MonthlySpend {
  userId: string
  month: string
  totalSpend: number
  categorySpend: Record<string, number>
  essentialSpend: number
  discretionarySpend: number
  orderCount: number
}

// ─── Address ─────────────────────────────────────────────────

export interface Address {
  line1: string
  line2?: string
  city: string
  province?: string
  postalCode?: string
  country: string
  coordinates?: { lat: number; lng: number }
}
