import { useMemo } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
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
    <Pressable style={styles.fab} onPress={() => router.push('/cart')}>
      <FontAwesome name="shopping-cart" size={16} color={palette.blackFig} />
      <View style={styles.info}>
        <Text style={styles.count}>{itemCount} items</Text>
        <Text style={styles.total}>{formatPrice(breakdown.total)}</Text>
      </View>
      <View style={styles.arrow}>
        <FontAwesome name="arrow-right" size={14} color={palette.blackFig} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 74,
    left: 20,
    right: 20,
    backgroundColor: palette.yuzuLime,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: palette.blackFig,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  info: { flex: 1, marginLeft: 12 },
  count: { fontSize: 11, color: palette.blackFig + '90' },
  total: { fontSize: 18, fontWeight: '800', color: palette.blackFig },
  arrow: { padding: 4 },
})
