import { View, Text, StyleSheet } from 'react-native'
import type { BudgetWarning } from '@foodlovers/types'
import { palette } from '@/constants/Colors'

export function InsightCard({ warning }: { warning: BudgetWarning }) {
  const bg = warning.severity === 'warning' ? palette.warningBg : warning.severity === 'caution' ? palette.cautionBg : palette.bgElevated
  const accent = warning.severity === 'warning' ? palette.warning : warning.severity === 'caution' ? palette.caution : palette.accentTeal

  return (
    <View style={[styles.card, { backgroundColor: bg, borderLeftColor: accent }]}>
      <Text style={styles.text}>{warning.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { borderRadius: 10, padding: 14, marginBottom: 10, borderLeftWidth: 3, borderWidth: 1, borderColor: palette.lineSubtle },
  text: { fontSize: 13, color: palette.textSecondary, lineHeight: 19 },
})
