import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { BUDGET_CATEGORIES, PRODUCTS } from '@foodlovers/mock-data'
import { palette } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useBudgetStore } from '@/stores/useBudgetStore'
import { useUserStore } from '@/stores/useUserStore'
import { ScreenHeader } from '@/components/ui/ScreenHeader'
import { ProductCard } from '@/components/ui/ProductCard'

export default function CategoryDetailScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>()
  const category = BUDGET_CATEGORIES.find((c) => c.id === categoryId)
  const categorySpend = useBudgetStore((s) => s.categorySpend)
  const monthlyBudget = useUserStore((s) => s.monthlyBudget)
  const currentSpend = useBudgetStore((s) => s.currentMonthSpend)
  const spendHistory = useBudgetStore((s) => s.spendHistory)

  const thisMonthSpend = categorySpend[categoryId ?? ''] ?? 0
  const thisMonthPct = currentSpend > 0 ? Math.round((thisMonthSpend / currentSpend) * 100) : 0

  const lastMonth = spendHistory[0]
  const lastMonthCatSpend = lastMonth?.categorySpend[categoryId ?? ''] ?? 0
  const lastMonthPct = lastMonth && lastMonth.totalSpend > 0 ? Math.round((lastMonthCatSpend / lastMonth.totalSpend) * 100) : 0

  const products = PRODUCTS.filter((p) => p.market === 'ZA' && p.budgetCategoryId === categoryId)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title={category?.name ?? 'Category'} showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={[styles.heroCard, { backgroundColor: (category?.color ?? palette.textSecondary) + '12' }]}>
          <Text style={[styles.heroAmount, { color: category?.color }]}>{formatPrice(thisMonthSpend)}</Text>
          <Text style={styles.heroLabel}>spent this month · {thisMonthPct}% of total</Text>
        </View>

        <View style={styles.compRow}>
          <View style={styles.compItem}>
            <Text style={styles.compLabel}>This month</Text>
            <Text style={styles.compValue}>{thisMonthPct}%</Text>
          </View>
          <View style={styles.compItem}>
            <Text style={styles.compLabel}>Last month</Text>
            <Text style={styles.compValue}>{lastMonthPct}%</Text>
          </View>
          <View style={styles.compItem}>
            <Text style={styles.compLabel}>Trend</Text>
            <Text style={[styles.compValue, { color: thisMonthPct > lastMonthPct ? palette.warning : palette.leafTeal }]}>
              {thisMonthPct > lastMonthPct ? '↑' : thisMonthPct < lastMonthPct ? '↓' : '→'}
            </Text>
          </View>
        </View>

        {thisMonthPct > lastMonthPct + 5 && (
          <View style={[styles.tipCard, { backgroundColor: palette.cautionLight, borderLeftColor: palette.caution }]}>
            <Text style={styles.tipText}>
              You're spending more on {category?.name} than last month. Consider swapping some items for essentials.
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Products in {category?.name}</Text>
        <View style={styles.grid}>
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.oatCream },
  scroll: { paddingHorizontal: 20 },
  heroCard: { borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 20 },
  heroAmount: { fontSize: 32, fontWeight: '800', marginBottom: 4 },
  heroLabel: { fontSize: 13, color: palette.textSecondary },
  compRow: { flexDirection: 'row', marginBottom: 20 },
  compItem: { flex: 1, alignItems: 'center' },
  compLabel: { fontSize: 12, color: palette.textSecondary, marginBottom: 4 },
  compValue: { fontSize: 20, fontWeight: '700', color: palette.textDark },
  tipCard: { borderRadius: 10, padding: 14, marginBottom: 20, borderLeftWidth: 4 },
  tipText: { fontSize: 14, color: '#4A3F50', lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: palette.textDark, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
})
