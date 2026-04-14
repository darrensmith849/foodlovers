import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import type { Product } from '@foodlovers/types'
import { palette } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useCartStore } from '@/stores/useCartStore'

const CATEGORY_EMOJI: Record<string, string> = {
  'dairy-eggs': '🥛', 'fresh-produce': '🥬', 'meat-poultry': '🍗', 'bakery': '🍞',
  'beverages': '🥤', 'snacks-confectionery': '🍿', 'cleaning-household': '🧹',
  'personal-care': '🧴', 'pantry-canned': '🥫', 'breakfast-cereals': '🥣',
  'condiments-sauces': '🫙', 'frozen': '🧊', 'baby': '🍼',
}

function tierColor(tier: string): string {
  return tier === 'ESSENTIAL' ? palette.positive : tier === 'SEMI_ESSENTIAL' ? palette.caution : palette.warning
}
function tierLabel(tier: string): string {
  return tier === 'ESSENTIAL' ? 'Essential' : tier === 'SEMI_ESSENTIAL' ? 'Semi' : 'Treat'
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const items = useCartStore((s) => s.items)
  const inCart = items.find((i) => i.productId === product.id)
  const emoji = CATEGORY_EMOJI[product.retailCategoryId] ?? '🛒'
  const tc = tierColor(product.essentialityTier)

  return (
    <View style={styles.card}>
      <Pressable style={styles.imageArea} onPress={() => router.push(`/product/${product.id}`)}>
        <Text style={styles.emoji}>{emoji}</Text>
        {inCart && (
          <View style={styles.cartQty}>
            <Text style={styles.cartQtyText}>{inCart.quantity}</Text>
          </View>
        )}
      </Pressable>
      <View style={styles.info}>
        <Pressable onPress={() => router.push(`/product/${product.id}`)}>
          <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
          <Text style={styles.unit}>{product.unit}</Text>
        </Pressable>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <View style={[styles.tierBadge, { backgroundColor: tc + '20' }]}>
            <Text style={[styles.tierText, { color: tc }]}>{tierLabel(product.essentialityTier)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => addItem(product.id)} activeOpacity={0.7}>
          <Text style={styles.addBtnText}>{inCart ? '+ More' : '+ Add'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: palette.bgElevated,
    borderRadius: 14,
    marginHorizontal: '1.5%',
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.lineSubtle,
  },
  imageArea: {
    height: 110,
    backgroundColor: palette.bgSoft,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: { fontSize: 44 },
  cartQty: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: palette.accentTeal,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartQtyText: { fontSize: 11, fontWeight: '800', color: palette.bgApp },
  info: { padding: 12 },
  name: { fontSize: 13, fontWeight: '600', color: palette.textPrimary, marginBottom: 2, lineHeight: 18 },
  unit: { fontSize: 11, color: palette.textMuted, marginBottom: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  price: { fontSize: 16, fontWeight: '800', color: palette.textPrimary, letterSpacing: -0.3 },
  tierBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5 },
  tierText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.3 },
  addBtn: {
    backgroundColor: palette.accentTeal,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addBtnText: { fontSize: 12, fontWeight: '700', color: palette.bgApp, letterSpacing: 0.2 },
})
