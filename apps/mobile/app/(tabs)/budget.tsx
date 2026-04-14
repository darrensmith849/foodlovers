import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { BUDGET_CATEGORIES } from '@foodlovers/mock-data'
import { brand } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useUserStore } from '@/stores/useUserStore'
import { useBudgetStore } from '@/stores/useBudgetStore'
import { EssentialitySplitBar } from '@/components/budget/EssentialitySplitBar'
import { InsightCard } from '@/components/budget/InsightCard'

const catMap = Object.fromEntries(BUDGET_CATEGORIES.map((c) => [c.id, c]))

export default function BudgetScreen() {
  const monthlyBudget = useUserStore((s) => s.monthlyBudget)
  const currentSpend = useBudgetStore((s) => s.currentMonthSpend)
  const categorySpend = useBudgetStore((s) => s.categorySpend)
  const essentialSpend = useBudgetStore((s) => s.essentialSpend)
  const discretionarySpend = useBudgetStore((s) => s.discretionarySpend)
  const orderCount = useBudgetStore((s) => s.orderCount)

  const remaining = monthlyBudget - currentSpend
  const utilisation = monthlyBudget > 0 ? Math.round((currentSpend / monthlyBudget) * 100) : 0
  const essentialPct = currentSpend > 0 ? Math.round((essentialSpend / currentSpend) * 100) : 0
  const discretionaryPct = currentSpend > 0 ? Math.round((discretionarySpend / currentSpend) * 100) : 0
  const semiPct = 100 - essentialPct - discretionaryPct

  const sortedCategories = Object.entries(categorySpend)
    .map(([id, amount]) => ({ id, amount, cat: catMap[id], pct: currentSpend > 0 ? Math.round((amount / currentSpend) * 100) : 0 }))
    .filter((c) => c.cat)
    .sort((a, b) => b.amount - a.amount)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Budget</Text>
        <Text style={styles.subtitle}>April 2026 · {orderCount} orders</Text>

        <View style={styles.overviewCard}>
          <View style={styles.overviewRow}>
            <Stat label="Spent" value={formatPrice(currentSpend)} />
            <View style={styles.overviewDivider} />
            <Stat label="Budget" value={formatPrice(monthlyBudget)} />
            <View style={styles.overviewDivider} />
            <Stat label="Left" value={formatPrice(remaining)} valueColor={remaining > 0 ? brand.green : brand.red} />
          </View>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${Math.min(100, utilisation)}%`, backgroundColor: utilisation > 80 ? brand.red : brand.green }]} />
          </View>
          <Text style={styles.barLabel}>{utilisation}% used</Text>
        </View>

        <Text style={styles.sectionTitle}>Spend by Category</Text>
        <View style={styles.categoryList}>
          {sortedCategories.map(({ id, amount, cat, pct }) => (
            <Pressable key={id} style={styles.catItem} onPress={() => router.push(`/budget-detail/${id}`)}>
              <View style={styles.catHeader}>
                <View style={[styles.catDot, { backgroundColor: cat!.color }]} />
                <Text style={styles.catName}>{cat!.name}</Text>
                <Text style={styles.catPct}>{pct}%</Text>
                <Text style={styles.catAmount}>{formatPrice(amount)}</Text>
              </View>
              <View style={styles.catBarTrack}>
                <View style={[styles.catBarFill, { width: `${pct}%`, backgroundColor: cat!.color }]} />
              </View>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Essential vs Discretionary</Text>
        <View style={styles.card}>
          <EssentialitySplitBar essentialPct={essentialPct} semiPct={semiPct} discretionaryPct={discretionaryPct} />
        </View>

        {utilisation < 80 && (
          <InsightCard warning={{ type: 'BUDGET_ON_TRACK', message: `You've used ${utilisation}% of your monthly grocery budget. You're on track.`, severity: 'info' }} />
        )}
        {utilisation >= 80 && utilisation < 100 && (
          <InsightCard warning={{ type: 'OVER_MONTHLY_BUDGET', message: `You've used ${utilisation}% of your budget. Consider reducing discretionary items.`, severity: 'caution' }} />
        )}
        {discretionaryPct > 30 && (
          <InsightCard warning={{ type: 'HIGH_DISCRETIONARY', message: `${discretionaryPct}% of your spend is on treats. Try swapping some for essentials.`, severity: 'caution' }} />
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function Stat({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, valueColor ? { color: valueColor } : null]}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  scroll: { paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: '700', color: brand.grey900, paddingTop: 12, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: brand.grey500, marginBottom: 20 },
  overviewCard: { backgroundColor: brand.grey900, borderRadius: 16, padding: 20, marginBottom: 28 },
  overviewRow: { flexDirection: 'row', marginBottom: 16 },
  overviewDivider: { width: 1, backgroundColor: brand.grey700 },
  statItem: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 12, color: brand.grey400, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '700', color: brand.white },
  barTrack: { height: 8, backgroundColor: brand.grey700, borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  barFill: { height: 8, borderRadius: 4 },
  barLabel: { fontSize: 12, color: brand.grey400, textAlign: 'right' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: brand.grey900, marginBottom: 14 },
  categoryList: { marginBottom: 28 },
  catItem: { marginBottom: 14 },
  catHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  catDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  catName: { flex: 1, fontSize: 14, color: brand.grey700 },
  catPct: { fontSize: 14, color: brand.grey400, marginRight: 12 },
  catAmount: { fontSize: 14, fontWeight: '600', color: brand.grey900, minWidth: 64, textAlign: 'right' },
  catBarTrack: { height: 6, backgroundColor: brand.grey100, borderRadius: 3, overflow: 'hidden' },
  catBarFill: { height: 6, borderRadius: 3 },
  card: { backgroundColor: brand.grey50, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: brand.grey200, marginBottom: 20 },
})
