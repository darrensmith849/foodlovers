import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import type { Product } from '@foodlovers/types'
import { brand } from '@/constants/Colors'
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

function essentialityColor(tier: string): string {
  return tier === 'ESSENTIAL' ? brand.green : tier === 'SEMI_ESSENTIAL' ? brand.amber : brand.orange
}

function essentialityLabel(tier: string): string {
  return tier === 'ESSENTIAL' ? 'Essential' : tier === 'SEMI_ESSENTIAL' ? 'Semi' : 'Treat'
}

export function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <Pressable
      style={compact ? styles.compactCard : styles.card}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View style={compact ? styles.compactImage : styles.imagePlaceholder}>
        <Text style={compact ? styles.compactEmoji : styles.emoji}>
          {CATEGORY_EMOJI[product.retailCategoryId] ?? '🛒'}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.unit}>{product.unit}</Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <View style={[styles.badge, { backgroundColor: essentialityColor(product.essentialityTier) + '18' }]}>
            <Text style={[styles.badgeText, { color: essentialityColor(product.essentialityTier) }]}>
              {essentialityLabel(product.essentialityTier)}
            </Text>
          </View>
        </View>
        <Pressable style={styles.addBtn} onPress={() => addItem(product.id)}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: brand.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: brand.grey200,
    marginHorizontal: '1.5%',
    marginBottom: 12,
    overflow: 'hidden',
  },
  compactCard: {
    width: 150,
    backgroundColor: brand.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: brand.grey200,
    marginRight: 12,
    overflow: 'hidden',
  },
  imagePlaceholder: { height: 100, backgroundColor: brand.grey50, alignItems: 'center', justifyContent: 'center' },
  compactImage: { height: 80, backgroundColor: brand.grey50, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 40 },
  compactEmoji: { fontSize: 32 },
  info: { padding: 10 },
  name: { fontSize: 13, fontWeight: '600', color: brand.grey900, marginBottom: 2, lineHeight: 17 },
  unit: { fontSize: 11, color: brand.grey400, marginBottom: 6 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  price: { fontSize: 15, fontWeight: '700', color: brand.green },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  badgeText: { fontSize: 9, fontWeight: '600' },
  addBtn: { backgroundColor: brand.greenLight, borderRadius: 8, paddingVertical: 6, alignItems: 'center' },
  addBtnText: { fontSize: 13, fontWeight: '600', color: brand.green },
})
