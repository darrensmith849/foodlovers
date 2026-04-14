import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { PRODUCTS, BUDGET_CATEGORIES, RETAIL_CATEGORIES } from '@foodlovers/mock-data'
import { brand } from '@/constants/Colors'
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

  if (!product) return <View style={styles.container}><Text>Product not found</Text></View>

  const retailCat = RETAIL_CATEGORIES.find((c) => c.id === product.retailCategoryId)
  const budgetCat = BUDGET_CATEGORIES.find((c) => c.id === product.budgetCategoryId)
  const tierColor = product.essentialityTier === 'ESSENTIAL' ? brand.green : product.essentialityTier === 'SEMI_ESSENTIAL' ? brand.amber : brand.orange
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
          <View style={[styles.tag, { borderColor: budgetCat?.color ?? brand.grey300 }]}>
            <Text style={[styles.tagText, { color: budgetCat?.color ?? brand.grey500 }]}>{budgetCat?.name}</Text>
          </View>
          <View style={[styles.tag, { borderColor: tierColor }]}>
            <Text style={[styles.tagText, { color: tierColor }]}>{tierLabel}</Text>
          </View>
          <View style={[styles.tag, { borderColor: brand.grey300 }]}>
            <Text style={[styles.tagText, { color: brand.grey500 }]}>{retailCat?.name}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Budget Impact</Text>
          <Text style={styles.infoText}>
            This product is classified as <Text style={{ fontWeight: '700', color: tierColor }}>{tierLabel.toLowerCase()}</Text> in the <Text style={{ fontWeight: '600' }}>{budgetCat?.name}</Text> category.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        {inCart ? (
          <View style={styles.inCartRow}>
            <Pressable style={styles.qtyBtn} onPress={() => useCartStore.getState().updateQuantity(product.id, inCart.quantity - 1)}>
              <Text style={styles.qtyBtnText}>-</Text>
            </Pressable>
            <Text style={styles.qtyText}>{inCart.quantity}</Text>
            <Pressable style={styles.qtyBtn} onPress={() => addItem(product.id)}>
              <Text style={styles.qtyBtnText}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.addBtn} onPress={() => addItem(product.id)}>
            <Text style={styles.addBtnText}>Add to Cart — {formatPrice(product.price)}</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  scroll: { paddingHorizontal: 20 },
  imageArea: { height: 200, backgroundColor: brand.grey50, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  emoji: { fontSize: 80 },
  name: { fontSize: 24, fontWeight: '700', color: brand.grey900, marginBottom: 4 },
  unit: { fontSize: 14, color: brand.grey400, marginBottom: 8 },
  price: { fontSize: 28, fontWeight: '800', color: brand.green, marginBottom: 12 },
  desc: { fontSize: 15, color: brand.grey500, lineHeight: 22, marginBottom: 20 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  tag: { borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { fontSize: 13, fontWeight: '600' },
  infoCard: { backgroundColor: brand.grey50, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: brand.grey200, marginBottom: 20 },
  infoTitle: { fontSize: 14, fontWeight: '600', color: brand.grey900, marginBottom: 6 },
  infoText: { fontSize: 14, color: brand.grey500, lineHeight: 20 },
  bottom: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: brand.grey200 },
  addBtn: { backgroundColor: brand.green, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  addBtnText: { fontSize: 17, fontWeight: '700', color: brand.white },
  inCartRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
  qtyBtn: { width: 48, height: 48, borderRadius: 14, backgroundColor: brand.greenLight, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 22, fontWeight: '700', color: brand.green },
  qtyText: { fontSize: 22, fontWeight: '700', color: brand.grey900, minWidth: 30, textAlign: 'center' },
})
