import type { Order, MonthlySpend } from '@foodlovers/types'

/**
 * Calculates monthly spend report from a list of orders for a given month.
 */
export function calculateMonthlySpend(
  orders: Order[],
  userId: string,
  month: string
): MonthlySpend {
  const categorySpend: Record<string, number> = {}
  let totalSpend = 0
  let essentialSpend = 0
  let discretionarySpend = 0

  for (const order of orders) {
    totalSpend += order.total

    for (const item of order.items) {
      const lineTotal = item.unitPrice * item.quantity
      const catId = item.budgetCategoryId
      categorySpend[catId] = (categorySpend[catId] ?? 0) + lineTotal

      switch (item.essentialityTier) {
        case 'ESSENTIAL':
          essentialSpend += lineTotal
          break
        case 'DISCRETIONARY':
          discretionarySpend += lineTotal
          break
      }
    }
  }

  return {
    userId,
    month,
    totalSpend,
    categorySpend,
    essentialSpend,
    discretionarySpend,
    orderCount: orders.length,
  }
}
