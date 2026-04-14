import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { PRODUCTS, BUDGET_CATEGORIES } from '@foodlovers/mock-data'
import { brand } from '@/constants/Colors'
import { useMemo } from 'react'
import { useCartStore } from '@/stores/useCartStore'
import { BudgetSummaryCard } from '@/components/budget/BudgetSummaryCard'
import { ProductCard } from '@/components/ui/ProductCard'
import { CartFab } from '@/components/ui/CartFab'
import { InsightCard } from '@/components/budget/InsightCard'

const ZA_PRODUCTS = PRODUCTS.filter((p) => p.market === 'ZA')

export default function ShopScreen() {
  const items = useCartStore((s) => s.items)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const warnings = useMemo(() => useCartStore.getState().getWarnings(), [items])

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good afternoon</Text>
            <Text style={styles.headerTitle}>FoodLovers</Text>
          </View>
          <Pressable style={styles.cartBadge} onPress={() => router.push('/cart')}>
            <Text style={styles.cartBadgeText}>🛒 {itemCount}</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <BudgetSummaryCard />
        </View>

        {warnings.length > 0 && (
          <View style={styles.section}>
            {warnings.slice(0, 2).map((w, i) => (
              <InsightCard key={i} warning={w} />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {BUDGET_CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={[styles.categoryChip, { borderColor: cat.color + '40' }]}
                onPress={() => router.push(`/browse/${cat.id}`)}
              >
                <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                <Text style={styles.categoryChipText}>{cat.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <View style={styles.productGrid}>
            {ZA_PRODUCTS.slice(0, 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      <CartFab />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  scroll: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, paddingBottom: 20 },
  greeting: { fontSize: 14, color: brand.grey500, marginBottom: 2 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: brand.grey900, letterSpacing: -0.5 },
  cartBadge: { backgroundColor: brand.greenLight, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  cartBadgeText: { fontSize: 14, fontWeight: '600', color: brand.green },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: brand.grey900, marginBottom: 12 },
  categoryScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, backgroundColor: brand.white },
  categoryDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  categoryChipText: { fontSize: 13, color: brand.grey700, fontWeight: '500' },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
})
