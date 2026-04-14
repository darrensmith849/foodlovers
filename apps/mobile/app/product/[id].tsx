import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { PRODUCTS, BUDGET_CATEGORIES, RETAIL_CATEGORIES } from '@foodlovers/mock-data'
import { palette } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useCartStore } from '@/stores/useCartStore'
import { ScreenHeader } from '@/components/ui/ScreenHeader'

const CATEGORY_EMOJI: Record<string, string> = {
  'dairy-eggs': '🥛', 'fresh-produce': '🥬', 'meat-poultry': '🍗', 'bakery': '🍞',
  'beverages': '🥤', 'snacks-confectionery': '🍿', 'cleaning-household': '🧹',
  'personal-care': '🧴', 'pantry-canned': '🥫', 'frozen': '🧊',
  'breakfast-cereals': '🥣', 'condiments-sauces': '🫙', 'baby': '🍼',
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const product = PRODUCTS.find((p) => p.id === id)
  const addItem = useCartStore((s) => s.addItem)
  const items = useCartStore((s) => s.items)
  const inCart = items.find((i) => i.productId === id)

  if (!product) return <View style={styles.container}><Text style={{ color: palette.textDark, padding: 40 }}>Product not found</Text></View>

  const budgetCat = BUDGET_CATEGORIES.find((c) => c.id === product.budgetCategoryId)
  const retailCat = RETAIL_CATEGORIES.find((c) => c.id === product.retailCategoryId)
  const tc = product.essentialityTier === 'ESSENTIAL' ? palette.leafTeal : product.essentialityTier === 'SEMI_ESSENTIAL' ? palette.caution : palette.papayaCoral
  const tierLabel = product.essentialityTier === 'ESSENTIAL' ? 'Essential' : product.essentialityTier === 'SEMI_ESSENTIAL' ? 'Semi-Essential' : 'Discretionary'

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.imageArea}>
          <Text style={styles.emoji}>{CATEGORY_EMOJI[product.retailCategoryId] ?? '🛒'}</Text>
        </View>

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.unit}>{product.unit}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.desc}>{product.description}</Text>

        <View style={styles.tags}>
          <View style={[styles.tag, { borderColor: budgetCat?.color ?? palette.muted }]}>
            <Text style={[styles.tagText, { color: budgetCat?.color ?? palette.textSecondary }]}>{budgetCat?.name}</Text>
          </View>
          <View style={[styles.tag, { borderColor: tc }]}>
            <Text style={[styles.tagText, { color: tc }]}>{tierLabel}</Text>
          </View>
          <View style={[styles.tag, { borderColor: palette.muted }]}>
            <Text style={[styles.tagText, { color: palette.textSecondary }]}>{retailCat?.name}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Smart Budget Info</Text>
          <Text style={styles.infoText}>
            {product.essentialityTier === 'ESSENTIAL'
              ? `This is a household staple in ${budgetCat?.name}. Good pick for staying within budget.`
              : product.essentialityTier === 'SEMI_ESSENTIAL'
                ? `A solid choice in ${budgetCat?.name}. Not essential, but a reasonable add.`
                : `This is a treat in ${budgetCat?.name}. Nothing wrong with that \u2014 just keep an eye on the balance.`}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        {inCart ? (
          <View style={styles.inCartRow}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => useCartStore.getState().updateQuantity(product.id, inCart.quantity - 1)} activeOpacity={0.7}>
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{inCart.quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => addItem(product.id)} activeOpacity={0.7}>
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addBtn} onPress={() => addItem(product.id)} activeOpacity={0.85}>
            <Text style={styles.addBtnText}>Add to Cart — {formatPrice(product.price)}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.oatCream },
  scroll: { paddingHorizontal: 20 },
  imageArea: { height: 200, backgroundColor: palette.surfaceCard, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  emoji: { fontSize: 80 },
  name: { fontSize: 24, fontWeight: '700', color: palette.textDark, marginBottom: 4 },
  unit: { fontSize: 14, color: palette.textSecondary, marginBottom: 8 },
  price: { fontSize: 28, fontWeight: '800', color: palette.textDark, marginBottom: 12 },
  desc: { fontSize: 15, color: palette.textSecondary, lineHeight: 22, marginBottom: 20 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  tag: { borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { fontSize: 12, fontWeight: '600' },
  infoCard: { backgroundColor: palette.surfaceCard, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: palette.border, marginBottom: 20 },
  infoTitle: { fontSize: 14, fontWeight: '600', color: palette.textDark, marginBottom: 6 },
  infoText: { fontSize: 14, color: palette.textSecondary, lineHeight: 20 },
  bottom: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: palette.border },
  addBtn: { backgroundColor: palette.deepAubergine, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  addBtnText: { fontSize: 17, fontWeight: '700', color: palette.yuzuLime },
  inCartRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
  qtyBtn: { width: 48, height: 48, borderRadius: 14, backgroundColor: palette.surfaceCard, borderWidth: 1, borderColor: palette.border, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 22, fontWeight: '700', color: palette.textDark },
  qtyText: { fontSize: 22, fontWeight: '700', color: palette.textDark, minWidth: 30, textAlign: 'center' },
})
