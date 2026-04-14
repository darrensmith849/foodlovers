import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { PRODUCTS, BUDGET_CATEGORIES } from '@foodlovers/mock-data'
import { palette } from '@/constants/Colors'
import { useMemo } from 'react'
import { useCartStore } from '@/stores/useCartStore'
import { useUserStore } from '@/stores/useUserStore'
import { useBudgetStore } from '@/stores/useBudgetStore'
import { formatPrice } from '@/hooks/useFormatPrice'
import { BudgetSummaryCard } from '@/components/budget/BudgetSummaryCard'
import { ProductCard } from '@/components/ui/ProductCard'
import { CartFab } from '@/components/ui/CartFab'
import { InsightCard } from '@/components/budget/InsightCard'

const ZA_PRODUCTS = PRODUCTS.filter((p) => p.market === 'ZA')
const CATEGORY_EMOJI: Record<string, string> = {
  'fresh-food': '🥬', 'pantry-staples': '🥫', 'proteins': '🍗',
  'beverages': '🥤', 'snacks-treats': '🍿', 'household': '🧹',
  'personal-care': '🧴', 'baby-kids': '🍼',
}

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
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>{getGreeting()}, {name}</Text>
            <Text style={styles.headerTitle}>FoodLovers</Text>
          </View>
          <Pressable
            style={[styles.cartBtn, itemCount > 0 && styles.cartBtnActive]}
            onPress={() => router.push('/cart')}
          >
            <FontAwesome name="shopping-cart" size={16} color={itemCount > 0 ? palette.bgApp : palette.textMuted} />
            {itemCount > 0 && <Text style={styles.cartCount}>{itemCount}</Text>}
          </Pressable>
        </View>

        {/* Budget Summary */}
        <View style={styles.section}>
          <BudgetSummaryCard />
        </View>

        {/* Insights */}
        {warnings.length > 0 && (
          <View style={styles.section}>
            {warnings.slice(0, 2).map((w, i) => (
              <InsightCard key={i} warning={w} />
            ))}
          </View>
        )}

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse</Text>
            <Text style={styles.sectionLink}>See all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {BUDGET_CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={styles.categoryCard}
                onPress={() => router.push(`/browse/${cat.id}`)}
              >
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryEmoji}>{CATEGORY_EMOJI[cat.id] ?? '🛒'}</Text>
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular right now</Text>
          </View>
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
  container: { flex: 1, backgroundColor: palette.bgApp },
  scroll: { paddingHorizontal: 16 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
  },
  greeting: { fontSize: 13, color: palette.textMuted, marginBottom: 2 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: palette.textPrimary, letterSpacing: -0.5 },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.bgElevated,
    borderWidth: 1,
    borderColor: palette.lineSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBtnActive: {
    backgroundColor: palette.accentTeal,
    borderColor: palette.accentTeal,
    flexDirection: 'row',
    gap: 4,
    width: 'auto',
    paddingHorizontal: 12,
  },
  cartCount: { fontSize: 13, fontWeight: '800', color: palette.bgApp },

  section: { marginBottom: 22 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: palette.textPrimary, letterSpacing: -0.2 },
  sectionLink: { fontSize: 12, color: palette.accentTeal, fontWeight: '600' },

  categoryScroll: { marginHorizontal: -16, paddingHorizontal: 16 },
  categoryCard: {
    alignItems: 'center',
    marginRight: 12,
    width: 64,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: palette.bgElevated,
    borderWidth: 1,
    borderColor: palette.lineSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryEmoji: { fontSize: 22 },
  categoryName: { fontSize: 10, color: palette.textMuted, fontWeight: '500', textAlign: 'center', lineHeight: 13 },

  productGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
})
