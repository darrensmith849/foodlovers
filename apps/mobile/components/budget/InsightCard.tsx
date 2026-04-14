import { View, Text, StyleSheet } from 'react-native'
import type { BudgetWarning } from '@foodlovers/types'
import { brand } from '@/constants/Colors'

export function InsightCard({ warning }: { warning: BudgetWarning }) {
  const bg = warning.severity === 'warning' ? brand.redLight : warning.severity === 'caution' ? brand.amberLight : brand.greenLight
  const border = warning.severity === 'warning' ? brand.red : warning.severity === 'caution' ? brand.amber : brand.green

  return (
    <View style={[styles.card, { backgroundColor: bg, borderLeftColor: border }]}>
      <Text style={styles.text}>{warning.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { borderRadius: 10, padding: 14, marginBottom: 8, borderLeftWidth: 4 },
  text: { fontSize: 14, color: brand.grey700, lineHeight: 20 },
})
