import { useMemo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { palette } from '@/constants/Colors'
import { useCartStore } from '@/stores/useCartStore'
import { formatPrice } from '@/hooks/useFormatPrice'

export function CartFab() {
  const items = useCartStore((s) => s.items)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const breakdown = useMemo(() => useCartStore.getState().getBreakdown(), [items])

  if (itemCount === 0) return null

  return (
    <TouchableOpacity style={styles.fab} onPress={() => router.push('/cart')} activeOpacity={0.85}>
      <FontAwesome name="shopping-cart" size={16} color={palette.bgApp} />
      <View style={styles.info}>
        <Text style={styles.count}>{itemCount} items</Text>
        <Text style={styles.total}>{formatPrice(breakdown.total)}</Text>
      </View>
      <FontAwesome name="arrow-right" size={14} color={palette.bgApp} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 74,
    left: 16,
    right: 16,
    backgroundColor: palette.accentTeal,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  info: { flex: 1, marginLeft: 12 },
  count: { fontSize: 11, color: palette.bgApp + '90' },
  total: { fontSize: 17, fontWeight: '800', color: palette.bgApp },
})
