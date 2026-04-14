import type { Product, BudgetCategory, EssentialityTier } from '@foodlovers/types'

export interface ProductClassification {
  retailCategoryId: string
  budgetCategoryId: string
  essentialityTier: EssentialityTier
}

/**
 * Returns the three-layer classification for a product.
 * In V1, classification is read directly from product data (set by admin).
 * In future versions, this could apply inference or overrides.
 */
export function categoriseProduct(product: Product): ProductClassification {
  return {
    retailCategoryId: product.retailCategoryId,
    budgetCategoryId: product.budgetCategoryId,
    essentialityTier: product.essentialityTier,
  }
}
