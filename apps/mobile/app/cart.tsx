import { useMemo } from 'react'
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { PRODUCTS } from '@foodlovers/mock-data'
import { brand } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useCartStore } from '@/stores/useCartStore'
import { EssentialitySplitBar } from '@/components/budget/EssentialitySplitBar'
import { CategorySpendRow } from '@/components/budget/CategorySpendRow'
import { InsightCard } from '@/components/budget/InsightCard'
import { ScreenHeader } from '@/components/ui/ScreenHeader'

const productMap = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]))

export default function CartScreen() {
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clearCart)
  const breakdown = useMemo(() => useCartStore.getState().getBreakdown(), [items])
  const warnings = useMemo(() => useCartStore.getState().getWarnings(), [items])

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScreenHeader title="Cart" showBack />
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>Browse products and add items to get started</Text>
          <Pressable style={styles.shopBtn} onPress={() => router.back()}>
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Cart"
        showBack
        rightAction={
          <Pressable onPress={clearCart}>
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Cart items */}
        {items.map((item) => {
          const product = productMap[item.productId]
          if (!product) return null
          return (
            <View key={item.productId} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={styles.itemUnit}>{product.unit} · {formatPrice(product.price)}</Text>
              </View>
              <View style={styles.itemActions}>
                <Pressable style={styles.qtyBtn} onPress={() => updateQuantity(item.productId, item.quantity - 1)}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </Pressable>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <Pressable style={styles.qtyBtn} onPress={() => updateQuantity(item.productId, item.quantity + 1)}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </Pressable>
              </View>
              <Text style={styles.itemTotal}>{formatPrice(product.price * item.quantity)}</Text>
            </View>
          )
        })}

        {/* Budget breakdown */}
        <View style={styles.breakdownCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Basket Total</Text>
            <Text style={styles.totalValue}>{formatPrice(breakdown.total)}</Text>
          </View>
          <View style={styles.divider} />
          <EssentialitySplitBar
            essentialPct={breakdown.essentialPercentage}
            semiPct={breakdown.semiEssentialPercentage}
            discretionaryPct={breakdown.discretionaryPercentage}
          />
          <View style={styles.divider} />
          {breakdown.categoryBreakdown.map((cat) => (
            <CategorySpendRow key={cat.budgetCategoryId} cat={cat} />
          ))}
          <View style={styles.divider} />
          <View style={styles.budgetImpact}>
            <Text style={styles.budgetLabel}>Monthly budget impact</Text>
            <Text style={[styles.budgetValue, breakdown.isOverBudget && { color: brand.red }]}>
              {breakdown.budgetUtilisation}% used
            </Text>
          </View>
          {breakdown.isOverBudget && (
            <Text style={styles.overBudget}>⚠️ This cart puts you {formatPrice(Math.abs(breakdown.budgetRemaining))} over budget</Text>
          )}
        </View>

        {/* Warnings */}
        {warnings.map((w, i) => (
          <InsightCard key={i} warning={w} />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottom}>
        <Pressable style={styles.checkoutBtn} onPress={() => router.push('/checkout')}>
          <Text style={styles.checkoutBtnText}>Checkout — {formatPrice(breakdown.total)}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  scroll: { paddingHorizontal: 20 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: brand.grey900, marginBottom: 8 },
  emptyText: { fontSize: 14, color: brand.grey400, textAlign: 'center', marginBottom: 24 },
  shopBtn: { backgroundColor: brand.green, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12 },
  shopBtnText: { fontSize: 15, fontWeight: '600', color: brand.white },
  clearText: { fontSize: 14, color: brand.red, fontWeight: '500' },
  itemCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: brand.grey100 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '600', color: brand.grey900, marginBottom: 2 },
  itemUnit: { fontSize: 12, color: brand.grey400 },
  itemActions: { flexDirection: 'row', alignItems: 'center', gap: 8, marginRight: 12 },
  qtyBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: brand.grey100, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 16, fontWeight: '700', color: brand.grey700 },
  qtyText: { fontSize: 15, fontWeight: '600', color: brand.grey900, minWidth: 20, textAlign: 'center' },
  itemTotal: { fontSize: 14, fontWeight: '600', color: brand.grey900, minWidth: 60, textAlign: 'right' },
  breakdownCard: { backgroundColor: brand.grey50, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: brand.grey200, marginTop: 20, marginBottom: 16 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 14, color: brand.grey500 },
  totalValue: { fontSize: 20, fontWeight: '700', color: brand.grey900 },
  divider: { height: 1, backgroundColor: brand.grey200, marginVertical: 12 },
  budgetImpact: { flexDirection: 'row', justifyContent: 'space-between' },
  budgetLabel: { fontSize: 14, color: brand.grey500 },
  budgetValue: { fontSize: 14, fontWeight: '600', color: brand.green },
  overBudget: { fontSize: 13, color: brand.red, marginTop: 8 },
  bottom: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: brand.grey200 },
  checkoutBtn: { backgroundColor: brand.green, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  checkoutBtnText: { fontSize: 17, fontWeight: '700', color: brand.white },
})
