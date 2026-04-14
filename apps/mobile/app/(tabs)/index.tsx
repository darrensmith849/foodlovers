import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import type { Product, BudgetCategory } from '@foodlovers/types'
import { calculateCartBudget, generateWarnings } from '@foodlovers/budgeting-engine'
import { PRODUCTS, BUDGET_CATEGORIES } from '@foodlovers/mock-data'

import { brand } from '@/constants/Colors'

// Simulated user state
const MONTHLY_BUDGET = 350000 // R3,500 in cents
const CURRENT_MONTH_SPEND = 42000 // R420 spent so far this month

// Simulate a small cart for the budget proof
const SIMULATED_CART = [
  { productId: 'p-001', quantity: 2, addedAt: Date.now() },
  { productId: 'p-006', quantity: 1, addedAt: Date.now() },
  { productId: 'p-010', quantity: 1, addedAt: Date.now() },
  { productId: 'p-022', quantity: 3, addedAt: Date.now() },
  { productId: 'p-027', quantity: 1, addedAt: Date.now() },
  { productId: 'p-020', quantity: 2, addedAt: Date.now() },
]

const productMap = Object.fromEntries(PRODUCTS.filter((p) => p.market === 'ZA').map((p) => [p.id, p]))
const categoryMap = Object.fromEntries(BUDGET_CATEGORIES.map((c) => [c.id, c]))

const breakdown = calculateCartBudget({
  items: SIMULATED_CART,
  products: productMap,
  budgetCategories: categoryMap,
  monthlyLimit: MONTHLY_BUDGET,
  currentMonthSpend: CURRENT_MONTH_SPEND,
})

const warnings = generateWarnings({
  breakdown,
  monthlyLimit: MONTHLY_BUDGET,
})

const ZA_PRODUCTS = PRODUCTS.filter((p) => p.market === 'ZA')

function formatPrice(cents: number): string {
  return `R${(cents / 100).toFixed(2)}`
}

function essentialityColor(tier: string): string {
  switch (tier) {
    case 'ESSENTIAL':
      return brand.green
    case 'SEMI_ESSENTIAL':
      return brand.amber
    case 'DISCRETIONARY':
      return brand.orange
    default:
      return brand.grey400
  }
}

function essentialityLabel(tier: string): string {
  switch (tier) {
    case 'ESSENTIAL':
      return 'Essential'
    case 'SEMI_ESSENTIAL':
      return 'Semi'
    case 'DISCRETIONARY':
      return 'Treat'
    default:
      return tier
  }
}

function ProductCard({ product }: { product: Product }) {
  return (
    <View style={styles.productCard}>
      <View style={styles.productImagePlaceholder}>
        <Text style={styles.productEmoji}>
          {product.retailCategoryId === 'dairy-eggs'
            ? '🥛'
            : product.retailCategoryId === 'fresh-produce'
              ? '🥬'
              : product.retailCategoryId === 'meat-poultry'
                ? '🍗'
                : product.retailCategoryId === 'bakery'
                  ? '🍞'
                  : product.retailCategoryId === 'beverages'
                    ? '🥤'
                    : product.retailCategoryId === 'snacks-confectionery'
                      ? '🍿'
                      : product.retailCategoryId === 'cleaning-household'
                        ? '🧹'
                        : product.retailCategoryId === 'personal-care'
                          ? '🧴'
                          : product.retailCategoryId === 'pantry-canned'
                            ? '🥫'
                            : '🛒'}
        </Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.productUnit}>{product.unit}</Text>
        <View style={styles.productBottom}>
          <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
          <View
            style={[
              styles.essentialityBadge,
              { backgroundColor: essentialityColor(product.essentialityTier) + '18' },
            ]}
          >
            <Text
              style={[styles.essentialityText, { color: essentialityColor(product.essentialityTier) }]}
            >
              {essentialityLabel(product.essentialityTier)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

function CategoryChip({ category }: { category: BudgetCategory }) {
  return (
    <View style={[styles.categoryChip, { borderColor: category.color + '40' }]}>
      <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
      <Text style={styles.categoryChipText}>{category.name}</Text>
    </View>
  )
}

export default function ShopScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good afternoon</Text>
            <Text style={styles.headerTitle}>FoodLovers</Text>
          </View>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>🛒 {SIMULATED_CART.length}</Text>
          </View>
        </View>

        {/* Budget Summary Card */}
        <View style={styles.budgetCard}>
          <View style={styles.budgetCardHeader}>
            <Text style={styles.budgetCardTitle}>This Month</Text>
            <Text style={styles.budgetCardAmount}>
              {formatPrice(CURRENT_MONTH_SPEND)} of {formatPrice(MONTHLY_BUDGET)}
            </Text>
          </View>
          <View style={styles.budgetBarTrack}>
            <View
              style={[
                styles.budgetBarFill,
                {
                  width: `${Math.min(100, Math.round((CURRENT_MONTH_SPEND / MONTHLY_BUDGET) * 100))}%`,
                  backgroundColor: CURRENT_MONTH_SPEND / MONTHLY_BUDGET > 0.8 ? brand.red : brand.green,
                },
              ]}
            />
          </View>
          <Text style={styles.budgetRemaining}>
            {formatPrice(MONTHLY_BUDGET - CURRENT_MONTH_SPEND)} remaining
          </Text>
        </View>

        {/* Cart Budget Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Basket Breakdown</Text>
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Basket Total</Text>
              <Text style={styles.breakdownValue}>{formatPrice(breakdown.total)}</Text>
            </View>
            <View style={styles.breakdownDivider} />

            {/* Essentiality split bar */}
            <View style={styles.splitBarContainer}>
              <View style={styles.splitBarTrack}>
                {breakdown.essentialPercentage > 0 && (
                  <View
                    style={[
                      styles.splitBarSegment,
                      {
                        width: `${breakdown.essentialPercentage}%`,
                        backgroundColor: brand.green,
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                      },
                    ]}
                  />
                )}
                {breakdown.semiEssentialPercentage > 0 && (
                  <View
                    style={[
                      styles.splitBarSegment,
                      { width: `${breakdown.semiEssentialPercentage}%`, backgroundColor: brand.amber },
                    ]}
                  />
                )}
                {breakdown.discretionaryPercentage > 0 && (
                  <View
                    style={[
                      styles.splitBarSegment,
                      {
                        width: `${breakdown.discretionaryPercentage}%`,
                        backgroundColor: brand.orange,
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                      },
                    ]}
                  />
                )}
              </View>
              <View style={styles.splitLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: brand.green }]} />
                  <Text style={styles.legendText}>Essential {breakdown.essentialPercentage}%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: brand.amber }]} />
                  <Text style={styles.legendText}>Semi {breakdown.semiEssentialPercentage}%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: brand.orange }]} />
                  <Text style={styles.legendText}>Treats {breakdown.discretionaryPercentage}%</Text>
                </View>
              </View>
            </View>

            <View style={styles.breakdownDivider} />

            {/* Category spend */}
            {breakdown.categoryBreakdown.map((cat) => (
              <View key={cat.budgetCategoryId} style={styles.categoryRow}>
                <View style={[styles.categoryRowDot, { backgroundColor: cat.color }]} />
                <Text style={styles.categoryRowName}>{cat.budgetCategoryName}</Text>
                <Text style={styles.categoryRowPercent}>{cat.percentage}%</Text>
                <Text style={styles.categoryRowAmount}>{formatPrice(cat.amount)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Budget Insights */}
        {warnings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Insights</Text>
            {warnings.map((w, i) => (
              <View
                key={i}
                style={[
                  styles.insightCard,
                  {
                    backgroundColor:
                      w.severity === 'warning'
                        ? brand.redLight
                        : w.severity === 'caution'
                          ? brand.amberLight
                          : brand.greenLight,
                    borderLeftColor:
                      w.severity === 'warning'
                        ? brand.red
                        : w.severity === 'caution'
                          ? brand.amber
                          : brand.green,
                  },
                ]}
              >
                <Text style={styles.insightText}>{w.message}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {BUDGET_CATEGORIES.map((cat) => (
              <CategoryChip key={cat.id} category={cat} />
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <View style={styles.productGrid}>
            {ZA_PRODUCTS.slice(0, 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.white,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: brand.grey500,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: brand.grey900,
    letterSpacing: -0.5,
  },
  cartBadge: {
    backgroundColor: brand.greenLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cartBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: brand.green,
  },
  budgetCard: {
    backgroundColor: brand.grey900,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  budgetCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  budgetCardTitle: {
    fontSize: 14,
    color: brand.grey400,
    fontWeight: '500',
  },
  budgetCardAmount: {
    fontSize: 14,
    color: brand.grey300,
  },
  budgetBarTrack: {
    height: 8,
    backgroundColor: brand.grey700,
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  budgetBarFill: {
    height: 8,
    borderRadius: 4,
  },
  budgetRemaining: {
    fontSize: 20,
    fontWeight: '700',
    color: brand.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: brand.grey900,
    marginBottom: 12,
  },
  breakdownCard: {
    backgroundColor: brand.grey50,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: brand.grey200,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 14,
    color: brand.grey500,
  },
  breakdownValue: {
    fontSize: 18,
    fontWeight: '700',
    color: brand.grey900,
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: brand.grey200,
    marginVertical: 12,
  },
  splitBarContainer: {
    marginVertical: 4,
  },
  splitBarTrack: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  splitBarSegment: {
    height: 10,
  },
  splitLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 11,
    color: brand.grey500,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  categoryRowDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  categoryRowName: {
    flex: 1,
    fontSize: 14,
    color: brand.grey700,
  },
  categoryRowPercent: {
    fontSize: 14,
    color: brand.grey400,
    marginRight: 12,
    minWidth: 32,
    textAlign: 'right',
  },
  categoryRowAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: brand.grey900,
    minWidth: 64,
    textAlign: 'right',
  },
  insightCard: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  insightText: {
    fontSize: 14,
    color: brand.grey700,
    lineHeight: 20,
  },
  categoryScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: brand.white,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryChipText: {
    fontSize: 13,
    color: brand.grey700,
    fontWeight: '500',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  productCard: {
    width: '47%',
    backgroundColor: brand.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: brand.grey200,
    marginHorizontal: '1.5%',
    marginBottom: 12,
    overflow: 'hidden',
  },
  productImagePlaceholder: {
    height: 100,
    backgroundColor: brand.grey50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: {
    fontSize: 40,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: brand.grey900,
    marginBottom: 2,
    lineHeight: 18,
  },
  productUnit: {
    fontSize: 12,
    color: brand.grey400,
    marginBottom: 8,
  },
  productBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: brand.green,
  },
  essentialityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  essentialityText: {
    fontSize: 10,
    fontWeight: '600',
  },
})
