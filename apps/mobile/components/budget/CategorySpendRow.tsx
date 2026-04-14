import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import type { CategorySpend } from '@foodlovers/types'
import { palette } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'

export function CategorySpendRow({ cat, showBar }: { cat: CategorySpend; showBar?: boolean }) {
  return (
    <Pressable
      style={styles.row}
      onPress={() => router.push(`/budget-detail/${cat.budgetCategoryId}`)}
    >
      <View style={[styles.dot, { backgroundColor: cat.color }]} />
      <Text style={styles.name}>{cat.budgetCategoryName}</Text>
      <Text style={styles.pct}>{cat.percentage}%</Text>
      <Text style={styles.amount}>{formatPrice(cat.amount)}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  name: { flex: 1, fontSize: 14, color: palette.textDark },
  pct: { fontSize: 14, color: palette.textSecondary, marginRight: 12, minWidth: 32, textAlign: 'right' },
  amount: { fontSize: 14, fontWeight: '600', color: palette.textDark, minWidth: 64, textAlign: 'right' },
})
