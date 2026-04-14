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
  const monthlyBudget = useUserStore((s) => s.monthlyBudget)
  const currentSpend = useBudgetStore((s) => s.currentMonthSpend)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const warnings = useMemo(() => useCartStore.getState().getWarnings(), [items])
  const remaining = monthlyBudget - currentSpend
  const utilPct = monthlyBudget > 0 ? Math.round((currentSpend / monthlyBudget) * 100) : 0

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
            <FontAwesome name="shopping-cart" size={16} color={itemCount > 0 ? palette.blackFig : palette.textSecondary} />
            {itemCount > 0 && <Text style={styles.cartCount}>{itemCount}</Text>}
          </Pressable>
        </View>

        {/* Budget Hero */}
        <Pressable style={styles.budgetHero} onPress={() => router.push('/(tabs)/budget')}>
          <View style={styles.budgetHeroTop}>
            <View>
              <Text style={styles.budgetLabel}>Monthly budget</Text>
              <Text style={styles.budgetRemaining}>{formatPrice(remaining)}</Text>
              <Text style={styles.budgetSub}>remaining of {formatPrice(monthlyBudget)}</Text>
            </View>
            <View style={styles.budgetRing}>
              <Text style={styles.budgetPct}>{utilPct}%</Text>
              <Text style={styles.budgetRingLabel}>used</Text>
            </View>
          </View>
          <View style={styles.budgetBar}>
            <View style={[styles.budgetBarFill, { width: `${Math.min(100, utilPct)}%`, backgroundColor: utilPct > 80 ? palette.warning : palette.yuzuLime }]} />
          </View>
        </Pressable>

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
                <View style={[styles.categoryIcon, { backgroundColor: cat.color + '18' }]}>
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
  container: { flex: 1, backgroundColor: palette.oatCream },
  scroll: { paddingHorizontal: 20 },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
  },
  greeting: { fontSize: 13, color: palette.textSecondary, marginBottom: 2 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: palette.textDark, letterSpacing: -0.6 },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: palette.surfaceCard,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBtnActive: {
    backgroundColor: palette.yuzuLime,
    borderColor: palette.yuzuLime,
    flexDirection: 'row',
    gap: 4,
    width: 'auto',
    paddingHorizontal: 14,
  },
  cartCount: { fontSize: 14, fontWeight: '800', color: palette.blackFig },

  // Budget Hero
  budgetHero: {
    backgroundColor: palette.deepAubergine,
    borderRadius: 20,
    padding: 20,
    marginBottom: 22,
  },
  budgetHeroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetLabel: { fontSize: 10, color: palette.textMuted, marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase' },
  budgetRemaining: { fontSize: 26, fontWeight: '800', color: palette.textPrimary, letterSpacing: -0.3 },
  budgetSub: { fontSize: 12, color: palette.textMuted, marginTop: 2 },
  budgetRing: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2.5,
    borderColor: palette.yuzuLime + '60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetPct: { fontSize: 15, fontWeight: '800', color: palette.yuzuLime },
  budgetRingLabel: { fontSize: 8, color: palette.textMuted, marginTop: -1 },
  budgetBar: {
    height: 4,
    backgroundColor: palette.blackFig,
    borderRadius: 2,
    overflow: 'hidden',
  },
  budgetBarFill: { height: 4, borderRadius: 2 },

  // Sections
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: palette.textDark, letterSpacing: -0.2 },
  sectionLink: { fontSize: 12, color: palette.leafTeal, fontWeight: '600' },

  // Categories
  categoryScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  categoryCard: {
    alignItems: 'center',
    marginRight: 14,
    width: 68,
  },
  categoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryEmoji: { fontSize: 24 },
  categoryName: { fontSize: 10, color: palette.textDark, fontWeight: '500', textAlign: 'center', lineHeight: 13 },

  // Products
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
})
