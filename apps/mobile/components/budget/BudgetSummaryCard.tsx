import { View, Text, StyleSheet } from 'react-native'
import { palette } from '@/constants/Colors'
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
              backgroundColor: utilisation > 80 ? palette.warning : palette.yuzuLime,
            },
          ]}
        />
      </View>
      <Text style={styles.remaining}>{formatPrice(remaining)} remaining</Text>
      <Text style={styles.hint}>
        {utilisation < 50 ? 'On track this month' : utilisation < 80 ? 'Halfway through your budget' : 'Getting close to your limit'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.deepAubergine,
    borderRadius: 20,
    padding: 22,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 },
  label: { fontSize: 13, color: palette.textMuted, fontWeight: '500', letterSpacing: 0.3 },
  amounts: { fontSize: 13, color: palette.textMuted },
  barTrack: { height: 6, backgroundColor: palette.blackFig, borderRadius: 3, marginBottom: 12, overflow: 'hidden' },
  barFill: { height: 6, borderRadius: 3 },
  remaining: { fontSize: 22, fontWeight: '700', color: palette.textPrimary },
  hint: { fontSize: 12, color: palette.textMuted, marginTop: 6 },
})
