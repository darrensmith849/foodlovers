import type {
  CartItem,
  Product,
  BudgetCategory,
  CartBudgetBreakdown,
  CategorySpend,
  MonthlySpend,
} from '@foodlovers/types'

interface CalculateCartBudgetInput {
  items: CartItem[]
  products: Record<string, Product>
  budgetCategories: Record<string, BudgetCategory>
  monthlyLimit: number
  currentMonthSpend: number
}

/**
 * Calculates the full budget breakdown for a cart.
 * Pure function — no side effects, no state.
 */
export function calculateCartBudget(input: CalculateCartBudgetInput): CartBudgetBreakdown {
  const { items, products, budgetCategories, monthlyLimit, currentMonthSpend } = input

  const categoryTotals: Record<string, number> = {}
  let total = 0
  let essentialTotal = 0
  let discretionaryTotal = 0
  let semiEssentialTotal = 0
  let currencyCode = ''

  for (const item of items) {
    const product = products[item.productId]
    if (!product) continue

    const lineTotal = product.price * item.quantity
    total += lineTotal
    currencyCode = product.currencyCode

    const catId = product.budgetCategoryId
    categoryTotals[catId] = (categoryTotals[catId] ?? 0) + lineTotal

    switch (product.essentialityTier) {
      case 'ESSENTIAL':
        essentialTotal += lineTotal
        break
      case 'SEMI_ESSENTIAL':
        semiEssentialTotal += lineTotal
        break
      case 'DISCRETIONARY':
        discretionaryTotal += lineTotal
        break
    }
  }

  const categoryBreakdown: CategorySpend[] = Object.entries(categoryTotals).map(
    ([catId, amount]) => ({
      budgetCategoryId: catId,
      budgetCategoryName: budgetCategories[catId]?.name ?? catId,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      color: budgetCategories[catId]?.color ?? '#888888',
    })
  )

  categoryBreakdown.sort((a, b) => b.amount - a.amount)

  const budgetRemaining = monthlyLimit - currentMonthSpend - total
  const budgetUtilisation =
    monthlyLimit > 0 ? Math.round(((currentMonthSpend + total) / monthlyLimit) * 100) : 0

  return {
    total,
    currencyCode,
    categoryBreakdown,
    essentialTotal,
    discretionaryTotal,
    semiEssentialTotal,
    essentialPercentage: total > 0 ? Math.round((essentialTotal / total) * 100) : 0,
    discretionaryPercentage: total > 0 ? Math.round((discretionaryTotal / total) * 100) : 0,
    semiEssentialPercentage: total > 0 ? Math.round((semiEssentialTotal / total) * 100) : 0,
    budgetRemaining,
    budgetUtilisation,
    isOverBudget: budgetRemaining < 0,
  }
}
