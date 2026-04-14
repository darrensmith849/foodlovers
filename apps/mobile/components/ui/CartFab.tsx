import { useMemo } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { brand } from '@/constants/Colors'
import { useCartStore } from '@/stores/useCartStore'
import { formatPrice } from '@/hooks/useFormatPrice'

export function CartFab() {
  const items = useCartStore((s) => s.items)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const breakdown = useMemo(() => useCartStore.getState().getBreakdown(), [items])

  if (itemCount === 0) return null

  return (
    <Pressable style={styles.fab} onPress={() => router.push('/cart')}>
      <FontAwesome name="shopping-cart" size={18} color={brand.white} />
      <View style={styles.info}>
        <Text style={styles.count}>{itemCount} items</Text>
        <Text style={styles.total}>{formatPrice(breakdown.total)}</Text>
      </View>
      <View style={styles.arrow}>
        <FontAwesome name="chevron-right" size={14} color={brand.white} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: brand.green,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  info: { flex: 1, marginLeft: 12 },
  count: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  total: { fontSize: 18, fontWeight: '700', color: brand.white },
  arrow: { padding: 4 },
})
