import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { calculateCartBudget } from '@foodlovers/budgeting-engine'
import { PRODUCTS, BUDGET_CATEGORIES } from '@foodlovers/mock-data'

import { brand } from '@/constants/Colors'

// Simulated monthly data
const MONTHLY_BUDGET = 350000
const CURRENT_MONTH_SPEND = 42000

const productMap = Object.fromEntries(PRODUCTS.filter((p) => p.market === 'ZA').map((p) => [p.id, p]))
const categoryMap = Object.fromEntries(BUDGET_CATEGORIES.map((c) => [c.id, c]))

// Simulate past orders aggregated into category spend
const MONTHLY_CATEGORY_SPEND: { name: string; amount: number; color: string; percentage: number }[] =
  [
    { name: 'Fresh Food', amount: 15200, color: '#22C55E', percentage: 36 },
    { name: 'Proteins', amount: 8999, color: '#EF4444', percentage: 21 },
    { name: 'Snacks & Treats', amount: 7497, color: '#A855F7', percentage: 18 },
    { name: 'Household', amount: 5998, color: '#06B6D4', percentage: 14 },
    { name: 'Beverages', amount: 2999, color: '#3B82F6', percentage: 7 },
    { name: 'Personal Care', amount: 1307, color: '#EC4899', percentage: 4 },
  ]

function formatPrice(cents: number): string {
  return `R${(cents / 100).toFixed(2)}`
}

export default function BudgetScreen() {
  const utilisation = Math.round((CURRENT_MONTH_SPEND / MONTHLY_BUDGET) * 100)
  const remaining = MONTHLY_BUDGET - CURRENT_MONTH_SPEND

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.screenTitle}>Budget</Text>
        <Text style={styles.screenSubtitle}>April 2026</Text>

        {/* Budget overview card */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewRow}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Spent</Text>
              <Text style={styles.overviewValue}>{formatPrice(CURRENT_MONTH_SPEND)}</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Budget</Text>
              <Text style={styles.overviewValue}>{formatPrice(MONTHLY_BUDGET)}</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Left</Text>
              <Text style={[styles.overviewValue, { color: brand.green }]}>
                {formatPrice(remaining)}
              </Text>
            </View>
          </View>
          <View style={styles.overviewBar}>
            <View
              style={[
                styles.overviewBarFill,
                {
                  width: `${Math.min(100, utilisation)}%`,
                  backgroundColor: utilisation > 80 ? brand.red : brand.green,
                },
              ]}
            />
          </View>
          <Text style={styles.overviewPercent}>{utilisation}% used</Text>
        </View>

        {/* Category breakdown */}
        <Text style={styles.sectionTitle}>Spend by Category</Text>
        <View style={styles.categoryList}>
          {MONTHLY_CATEGORY_SPEND.map((cat) => (
            <View key={cat.name} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <View style={[styles.catDot, { backgroundColor: cat.color }]} />
                <Text style={styles.catName}>{cat.name}</Text>
                <Text style={styles.catPercent}>{cat.percentage}%</Text>
                <Text style={styles.catAmount}>{formatPrice(cat.amount)}</Text>
              </View>
              <View style={styles.catBarTrack}>
                <View
                  style={[
                    styles.catBarFill,
                    { width: `${cat.percentage}%`, backgroundColor: cat.color },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Essentiality summary */}
        <Text style={styles.sectionTitle}>Essential vs Discretionary</Text>
        <View style={styles.essentialCard}>
          <View style={styles.essentialRow}>
            <View style={[styles.essentialDot, { backgroundColor: brand.green }]} />
            <Text style={styles.essentialLabel}>Essential</Text>
            <Text style={styles.essentialValue}>57%</Text>
          </View>
          <View style={styles.essentialRow}>
            <View style={[styles.essentialDot, { backgroundColor: brand.amber }]} />
            <Text style={styles.essentialLabel}>Semi-Essential</Text>
            <Text style={styles.essentialValue}>21%</Text>
          </View>
          <View style={styles.essentialRow}>
            <View style={[styles.essentialDot, { backgroundColor: brand.orange }]} />
            <Text style={styles.essentialLabel}>Discretionary</Text>
            <Text style={styles.essentialValue}>22%</Text>
          </View>
          <View style={styles.essentialBarTrack}>
            <View style={[styles.essentialBarSeg, { width: '57%', backgroundColor: brand.green, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }]} />
            <View style={[styles.essentialBarSeg, { width: '21%', backgroundColor: brand.amber }]} />
            <View style={[styles.essentialBarSeg, { width: '22%', backgroundColor: brand.orange, borderTopRightRadius: 4, borderBottomRightRadius: 4 }]} />
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.insightCard, { backgroundColor: brand.greenLight, borderLeftColor: brand.green }]}>
          <Text style={styles.insightText}>
            You've used {utilisation}% of your monthly grocery budget. You're on track.
          </Text>
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
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: brand.grey900,
    paddingTop: 12,
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 14,
    color: brand.grey500,
    marginBottom: 20,
  },
  // Overview
  overviewCard: {
    backgroundColor: brand.grey900,
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
  },
  overviewRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewDivider: {
    width: 1,
    backgroundColor: brand.grey700,
  },
  overviewLabel: {
    fontSize: 12,
    color: brand.grey400,
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: '700',
    color: brand.white,
  },
  overviewBar: {
    height: 8,
    backgroundColor: brand.grey700,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  overviewBarFill: {
    height: 8,
    borderRadius: 4,
  },
  overviewPercent: {
    fontSize: 12,
    color: brand.grey400,
    textAlign: 'right',
  },
  // Category list
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: brand.grey900,
    marginBottom: 14,
  },
  categoryList: {
    marginBottom: 28,
  },
  categoryItem: {
    marginBottom: 14,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  catDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  catName: {
    flex: 1,
    fontSize: 14,
    color: brand.grey700,
  },
  catPercent: {
    fontSize: 14,
    color: brand.grey400,
    marginRight: 12,
  },
  catAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: brand.grey900,
    minWidth: 64,
    textAlign: 'right',
  },
  catBarTrack: {
    height: 6,
    backgroundColor: brand.grey100,
    borderRadius: 3,
    overflow: 'hidden',
  },
  catBarFill: {
    height: 6,
    borderRadius: 3,
  },
  // Essentiality
  essentialCard: {
    backgroundColor: brand.grey50,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: brand.grey200,
    marginBottom: 20,
  },
  essentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  essentialDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  essentialLabel: {
    flex: 1,
    fontSize: 14,
    color: brand.grey700,
  },
  essentialValue: {
    fontSize: 14,
    fontWeight: '600',
    color: brand.grey900,
  },
  essentialBarTrack: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
  },
  essentialBarSeg: {
    height: 10,
  },
  // Insight
  insightCard: {
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: brand.grey700,
    lineHeight: 20,
  },
})
