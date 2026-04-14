import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import type { Product } from '@foodlovers/types'
import { palette } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useCartStore } from '@/stores/useCartStore'

const CATEGORY_BG: Record<string, string> = {
  'dairy-eggs': '#E8DDD4',
  'fresh-produce': '#D4E8DC',
  'meat-poultry': '#E8D4D0',
  'bakery': '#E8E0D0',
  'beverages': '#D4DEE8',
  'snacks-confectionery': '#E4D4E8',
  'cleaning-household': '#D4E4E8',
  'personal-care': '#E0D4E8',
  'pantry-canned': '#E4DED0',
  'breakfast-cereals': '#E8E4D0',
  'condiments-sauces': '#E8DCD4',
  'frozen': '#D4E0E8',
  'baby': '#E8DCD0',
}

function essentialityColor(tier: string): string {
  return tier === 'ESSENTIAL' ? palette.leafTeal : tier === 'SEMI_ESSENTIAL' ? palette.caution : palette.papayaCoral
}

function essentialityLabel(tier: string): string {
  return tier === 'ESSENTIAL' ? 'Essential' : tier === 'SEMI_ESSENTIAL' ? 'Semi' : 'Treat'
}

function productInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

export function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const addItem = useCartStore((s) => s.addItem)
  const bg = CATEGORY_BG[product.retailCategoryId] ?? '#E8E2D9'

  return (
    <Pressable
      style={compact ? styles.compactCard : styles.card}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View style={[compact ? styles.compactImage : styles.imagePlaceholder, { backgroundColor: bg }]}>
        <Text style={[compact ? styles.compactInitials : styles.initials, { color: palette.deepAubergine + '60' }]}>
          {productInitials(product.name)}
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
        <Pressable
          style={styles.addBtn}
          onPress={(e) => { e.stopPropagation(); addItem(product.id) }}
        >
          <Text style={styles.addBtnText}>+ Add</Text>
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: palette.surfaceCard,
    borderRadius: 16,
    marginHorizontal: '1.5%',
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: palette.blackFig,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  compactCard: {
    width: 150,
    backgroundColor: palette.surfaceCard,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: palette.blackFig,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  imagePlaceholder: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactImage: {
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 1,
  },
  compactInitials: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
  },
  info: { padding: 12 },
  name: { fontSize: 13, fontWeight: '600', color: palette.textDark, marginBottom: 2, lineHeight: 17 },
  unit: { fontSize: 11, color: palette.textSecondary, marginBottom: 8 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  price: { fontSize: 16, fontWeight: '700', color: palette.textDark },
  badge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  badgeText: { fontSize: 9, fontWeight: '600' },
  addBtn: {
    backgroundColor: palette.yuzuLime,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addBtnText: { fontSize: 13, fontWeight: '700', color: palette.blackFig },
})
