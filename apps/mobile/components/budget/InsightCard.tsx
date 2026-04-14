import { View, Text, StyleSheet } from 'react-native'
import type { BudgetWarning } from '@foodlovers/types'
import { palette } from '@/constants/Colors'

export function InsightCard({ warning }: { warning: BudgetWarning }) {
  const bg = warning.severity === 'warning' ? palette.warningLight : warning.severity === 'caution' ? palette.cautionLight : palette.surfaceCard
  const accent = warning.severity === 'warning' ? palette.warning : warning.severity === 'caution' ? palette.caution : palette.leafTeal

  return (
    <View style={[styles.card, { backgroundColor: bg, borderLeftColor: accent }]}>
      <Text style={styles.text}>{warning.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, padding: 14, marginBottom: 10, borderLeftWidth: 3 },
  text: { fontSize: 14, color: palette.textDark, lineHeight: 20 },
})
