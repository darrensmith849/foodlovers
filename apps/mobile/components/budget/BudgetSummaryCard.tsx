import { View, Text, StyleSheet } from 'react-native'
import { brand } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useUserStore } from '@/stores/useUserStore'
import { useBudgetStore } from '@/stores/useBudgetStore'

export function BudgetSummaryCard() {
  const monthlyBudget = useUserStore((s) => s.monthlyBudget)
  const currentSpend = useBudgetStore((s) => s.currentMonthSpend)
  const remaining = monthlyBudget - currentSpend
  const utilisation = monthlyBudget > 0 ? Math.round((currentSpend / monthlyBudget) * 100) : 0

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>This Month</Text>
        <Text style={styles.amounts}>
          {formatPrice(currentSpend)} of {formatPrice(monthlyBudget)}
        </Text>
      </View>
      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            {
              width: `${Math.min(100, utilisation)}%`,
              backgroundColor: utilisation > 80 ? brand.red : brand.green,
            },
          ]}
        />
      </View>
      <Text style={styles.remaining}>{formatPrice(remaining)} remaining</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: brand.grey900, borderRadius: 16, padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 },
  label: { fontSize: 14, color: brand.grey400, fontWeight: '500' },
  amounts: { fontSize: 14, color: brand.grey300 },
  barTrack: { height: 8, backgroundColor: brand.grey700, borderRadius: 4, marginBottom: 10, overflow: 'hidden' },
  barFill: { height: 8, borderRadius: 4 },
  remaining: { fontSize: 20, fontWeight: '700', color: brand.white },
})
