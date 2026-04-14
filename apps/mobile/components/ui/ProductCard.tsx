import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import type { Product } from '@foodlovers/types'
import { palette } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useCartStore } from '@/stores/useCartStore'

const CATEGORY_EMOJI: Record<string, string> = {
  'dairy-eggs': '🥛',
  'fresh-produce': '🥬',
  'meat-poultry': '🍗',
  'bakery': '🍞',
  'beverages': '🥤',
  'snacks-confectionery': '🍿',
  'cleaning-household': '🧹',
  'personal-care': '🧴',
  'pantry-canned': '🥫',
  'breakfast-cereals': '🥣',
  'condiments-sauces': '🫙',
  'frozen': '🧊',
  'baby': '🍼',
}

const CATEGORY_GRADIENT: Record<string, [string, string]> = {
  'dairy-eggs': ['#F5EFE8', '#EDE4D6'],
  'fresh-produce': ['#E8F5EC', '#D4ECDA'],
  'meat-poultry': ['#F5EBE8', '#ECDAD4'],
  'bakery': ['#F5F0E8', '#ECE4D4'],
  'beverages': ['#E8EDF5', '#D4DEEC'],
  'snacks-confectionery': ['#F2E8F5', '#E4D4EC'],
  'cleaning-household': ['#E8F2F5', '#D4E8EC'],
  'personal-care': ['#EEE8F5', '#E0D4EC'],
  'pantry-canned': ['#F2EEE8', '#E8E0D4'],
  'breakfast-cereals': ['#F5F2E8', '#ECE8D4'],
  'condiments-sauces': ['#F5ECE8', '#ECDCD4'],
  'frozen': ['#E8EEF5', '#D4E4EC'],
  'baby': ['#F5ECE8', '#ECDCD4'],
}

function tierColor(tier: string): string {
  return tier === 'ESSENTIAL' ? palette.leafTeal : tier === 'SEMI_ESSENTIAL' ? palette.caution : palette.papayaCoral
}

function tierLabel(tier: string): string {
  return tier === 'ESSENTIAL' ? 'Essential' : tier === 'SEMI_ESSENTIAL' ? 'Semi' : 'Treat'
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const items = useCartStore((s) => s.items)
  const inCart = items.find((i) => i.productId === product.id)
  const bg = CATEGORY_GRADIENT[product.retailCategoryId]?.[0] ?? '#F0EBE3'
  const emoji = CATEGORY_EMOJI[product.retailCategoryId] ?? '🛒'
  const tc = tierColor(product.essentialityTier)

  return (
    <View style={styles.card}>
      <Pressable
        style={[styles.imageArea, { backgroundColor: bg }]}
        onPress={() => router.push(`/product/${product.id}`)}
      >
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
          <View style={[styles.tierBadge, { backgroundColor: tc + '15' }]}>
            <View style={[styles.tierDot, { backgroundColor: tc }]} />
            <Text style={[styles.tierText, { color: tc }]}>{tierLabel(product.essentialityTier)}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => addItem(product.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.addBtnText}>{inCart ? `+ Add more` : '+ Add to cart'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: palette.surfaceElevated,
    borderRadius: 18,
    marginHorizontal: '1.5%',
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border + '80',
    shadowColor: palette.blackFig,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  imageArea: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: {
    fontSize: 48,
  },
  cartQty: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: palette.yuzuLime,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartQtyText: {
    fontSize: 12,
    fontWeight: '800',
    color: palette.blackFig,
  },
  info: { padding: 14 },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.textDark,
    marginBottom: 2,
    lineHeight: 19,
  },
  unit: {
    fontSize: 11,
    color: palette.textSecondary,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: palette.textDark,
    letterSpacing: -0.3,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  tierDot: { width: 5, height: 5, borderRadius: 3 },
  tierText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.3 },
  addBtn: {
    backgroundColor: palette.deepAubergine,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.yuzuLime,
    letterSpacing: 0.3,
  },
})
