import { useState } from 'react'
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { brand } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useCartStore } from '@/stores/useCartStore'
import { useUserStore } from '@/stores/useUserStore'
import { useOrderStore } from '@/stores/useOrderStore'
import { useBudgetStore } from '@/stores/useBudgetStore'
import { PRODUCTS } from '@foodlovers/mock-data'
import { ScreenHeader } from '@/components/ui/ScreenHeader'
import { EssentialitySplitBar } from '@/components/budget/EssentialitySplitBar'

const productMap = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]))

export default function CheckoutScreen() {
  const items = useCartStore((s) => s.items)
  const breakdown = useCartStore((s) => s.getBreakdown())
  const clearCart = useCartStore((s) => s.clearCart)
  const address = useUserStore((s) => s.defaultAddress)
  const addOrder = useOrderStore((s) => s.addOrder)
  const addOrderSpend = useBudgetStore((s) => s.addOrderSpend)
  const [confirmed, setConfirmed] = useState(false)

  function handleConfirm() {
    const orderId = `ord-${Date.now().toString(36)}`
    const orderItems = items.map((item) => {
      const p = productMap[item.productId]!
      return {
        productId: item.productId,
        productName: p.name,
        quantity: item.quantity,
        unitPrice: p.price,
        budgetCategoryId: p.budgetCategoryId,
        essentialityTier: p.essentialityTier,
      }
    })

    const catSpend: Record<string, number> = {}
    for (const cat of breakdown.categoryBreakdown) {
      catSpend[cat.budgetCategoryId] = cat.amount
    }

    addOrder({
      id: orderId,
      items: orderItems,
      total: breakdown.total,
      currencyCode: breakdown.currencyCode || 'ZAR',
      status: 'confirmed',
      createdAt: Date.now(),
      deliveryAddress: address ?? { line1: 'No address', city: '', country: 'ZA' },
      budgetSnapshot: breakdown,
    })

    addOrderSpend(breakdown.total, catSpend, breakdown.essentialTotal, breakdown.discretionaryTotal)
    clearCart()
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.confirmation}>
          <Text style={styles.confirmEmoji}>✅</Text>
          <Text style={styles.confirmTitle}>Order Confirmed</Text>
          <Text style={styles.confirmText}>Your groceries are on the way. Your budget has been updated.</Text>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmLabel}>Order Total</Text>
            <Text style={styles.confirmValue}>{formatPrice(breakdown.total)}</Text>
          </View>
          <Pressable style={styles.doneBtn} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.doneBtnText}>Back to Shop</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Checkout" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.card}>
            <Text style={styles.addressLine}>{address?.line1 ?? 'No address set'}</Text>
            <Text style={styles.addressCity}>{address?.city}, {address?.postalCode}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.card}>
            <Text style={styles.summaryLine}>{items.length} items · {formatPrice(breakdown.total)}</Text>
            <View style={{ marginTop: 12 }}>
              <EssentialitySplitBar
                essentialPct={breakdown.essentialPercentage}
                semiPct={breakdown.semiEssentialPercentage}
                discretionaryPct={breakdown.discretionaryPercentage}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Impact</Text>
          <View style={styles.card}>
            <Text style={styles.impactText}>
              After this order, you'll have used <Text style={{ fontWeight: '700' }}>{breakdown.budgetUtilisation}%</Text> of your monthly budget.
            </Text>
            {breakdown.isOverBudget && (
              <Text style={styles.overText}>This order will put you over budget.</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.card}>
            <Text style={styles.paymentText}>💳 Pay on delivery (mock)</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottom}>
        <Pressable style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmBtnText}>Confirm Order — {formatPrice(breakdown.total)}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  scroll: { paddingHorizontal: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: brand.grey900, marginBottom: 8 },
  card: { backgroundColor: brand.grey50, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: brand.grey200 },
  addressLine: { fontSize: 15, fontWeight: '600', color: brand.grey900 },
  addressCity: { fontSize: 13, color: brand.grey500, marginTop: 2 },
  summaryLine: { fontSize: 15, fontWeight: '600', color: brand.grey900 },
  impactText: { fontSize: 14, color: brand.grey600, lineHeight: 20 },
  overText: { fontSize: 13, color: brand.red, marginTop: 8, fontWeight: '500' },
  paymentText: { fontSize: 15, color: brand.grey700 },
  bottom: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: brand.grey200 },
  confirmBtn: { backgroundColor: brand.green, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  confirmBtnText: { fontSize: 17, fontWeight: '700', color: brand.white },
  confirmation: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  confirmEmoji: { fontSize: 64, marginBottom: 16 },
  confirmTitle: { fontSize: 24, fontWeight: '700', color: brand.grey900, marginBottom: 8 },
  confirmText: { fontSize: 15, color: brand.grey500, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  confirmCard: { backgroundColor: brand.greenLight, borderRadius: 14, padding: 20, alignItems: 'center', marginBottom: 24, width: '100%' },
  confirmLabel: { fontSize: 13, color: brand.green, marginBottom: 4 },
  confirmValue: { fontSize: 28, fontWeight: '800', color: brand.green },
  doneBtn: { backgroundColor: brand.green, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32 },
  doneBtnText: { fontSize: 16, fontWeight: '700', color: brand.white },
})
