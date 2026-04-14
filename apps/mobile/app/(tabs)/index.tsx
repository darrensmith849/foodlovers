import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { PRODUCTS, BUDGET_CATEGORIES } from '@foodlovers/mock-data'
import { palette } from '@/constants/Colors'
import { useMemo } from 'react'
import { useCartStore } from '@/stores/useCartStore'
import { useUserStore } from '@/stores/useUserStore'
import { BudgetSummaryCard } from '@/components/budget/BudgetSummaryCard'
import { ProductCard } from '@/components/ui/ProductCard'
import { CartFab } from '@/components/ui/CartFab'
import { InsightCard } from '@/components/budget/InsightCard'

const ZA_PRODUCTS = PRODUCTS.filter((p) => p.market === 'ZA')

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function ShopScreen() {
  const items = useCartStore((s) => s.items)
  const name = useUserStore((s) => s.name)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const warnings = useMemo(() => useCartStore.getState().getWarnings(), [items])

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}, {name}</Text>
            <Text style={styles.headerTitle}>FoodLovers</Text>
          </View>
          {itemCount > 0 && (
            <Pressable style={styles.cartBadge} onPress={() => router.push('/cart')}>
              <Text style={styles.cartBadgeText}>{itemCount}</Text>
            </Pressable>
          )}
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
                style={styles.categoryChip}
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
  container: { flex: 1, backgroundColor: palette.oatCream },
  scroll: { paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: { fontSize: 14, color: palette.textSecondary, marginBottom: 2 },
  headerTitle: { fontSize: 30, fontWeight: '800', color: palette.textDark, letterSpacing: -0.8 },
  cartBadge: {
    backgroundColor: palette.yuzuLime,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: { fontSize: 14, fontWeight: '700', color: palette.blackFig },
  section: { marginBottom: 28 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: palette.textDark,
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  categoryScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: 8,
    backgroundColor: palette.surfaceCard,
  },
  categoryDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  categoryChipText: { fontSize: 13, color: palette.textDark, fontWeight: '500' },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
})
