import type { CartBudgetBreakdown, BudgetWarning, MonthlySpend } from '@foodlovers/types'

const DISCRETIONARY_HIGH_THRESHOLD = 50
const CATEGORY_DOMINANT_THRESHOLD = 35
const CATEGORY_SPIKE_THRESHOLD = 10

interface GenerateWarningsInput {
  breakdown: CartBudgetBreakdown
  monthlyHistory?: MonthlySpend[]
  monthlyLimit: number
}

/**
 * Generates contextual budget warnings based on cart breakdown and history.
 * Returns an array of warnings sorted by severity.
 */
export function generateWarnings(input: GenerateWarningsInput): BudgetWarning[] {
  const { breakdown, monthlyHistory, monthlyLimit } = input
  const warnings: BudgetWarning[] = []

  if (breakdown.isOverBudget) {
    const overAmount = Math.abs(breakdown.budgetRemaining)
    warnings.push({
      type: 'OVER_MONTHLY_BUDGET',
      message: `This cart puts you ${overAmount} over your monthly budget`,
      severity: 'warning',
    })
  }

  if (breakdown.discretionaryPercentage > DISCRETIONARY_HIGH_THRESHOLD) {
    warnings.push({
      type: 'HIGH_DISCRETIONARY',
      message: `${breakdown.discretionaryPercentage}% of this cart is discretionary items`,
      severity: 'caution',
    })
  }

  for (const cat of breakdown.categoryBreakdown) {
    if (cat.percentage > CATEGORY_DOMINANT_THRESHOLD) {
      warnings.push({
        type: 'SINGLE_CATEGORY_DOMINANT',
        message: `${cat.budgetCategoryName} is ${cat.percentage}% of your basket`,
        severity: 'caution',
        categoryId: cat.budgetCategoryId,
      })
    }
  }

  if (monthlyHistory && monthlyHistory.length > 0) {
    for (const cat of breakdown.categoryBreakdown) {
      const historicalAvg = calculateHistoricalAverage(
        monthlyHistory,
        cat.budgetCategoryId,
        monthlyLimit
      )
      if (historicalAvg !== null && cat.percentage > historicalAvg + CATEGORY_SPIKE_THRESHOLD) {
        warnings.push({
          type: 'CATEGORY_SPIKE',
          message: `You're spending ${cat.percentage}% on ${cat.budgetCategoryName} — up from ${historicalAvg}% average`,
          severity: 'caution',
          categoryId: cat.budgetCategoryId,
        })
      }
    }
  }

  if (
    !breakdown.isOverBudget &&
    breakdown.essentialPercentage >= 60 &&
    breakdown.budgetUtilisation <= 80
  ) {
    warnings.push({
      type: 'BUDGET_ON_TRACK',
      message: `Great — ${breakdown.essentialPercentage}% essentials this month`,
      severity: 'info',
    })
  }

  const severityOrder: Record<string, number> = { warning: 0, caution: 1, info: 2 }
  warnings.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])

  return warnings
}

function calculateHistoricalAverage(
  history: MonthlySpend[],
  categoryId: string,
  monthlyLimit: number
): number | null {
  const relevantMonths = history.slice(-3)
  if (relevantMonths.length === 0) return null

  const totalCatSpend = relevantMonths.reduce(
    (sum, month) => sum + (month.categorySpend[categoryId] ?? 0),
    0
  )
  const totalSpend = relevantMonths.reduce((sum, month) => sum + month.totalSpend, 0)

  if (totalSpend === 0) return null
  return Math.round((totalCatSpend / totalSpend) * 100)
}
