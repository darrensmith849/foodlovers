import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { brand } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useOrderStore } from '@/stores/useOrderStore'
import { ScreenHeader } from '@/components/ui/ScreenHeader'
import { EssentialitySplitBar } from '@/components/budget/EssentialitySplitBar'
import { CategorySpendRow } from '@/components/budget/CategorySpendRow'

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const order = useOrderStore((s) => s.getOrder(id ?? ''))

  if (!order) return <SafeAreaView style={styles.container}><ScreenHeader title="Order" showBack /><View style={styles.empty}><Text>Order not found</Text></View></SafeAreaView>

  const snap = order.budgetSnapshot

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title={`Order #${order.id.slice(-3)}`} subtitle={new Date(order.createdAt).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })} showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items</Text>
          {order.items.map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.productName}</Text>
              <Text style={styles.itemQty}>x{item.quantity}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.unitPrice * item.quantity)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(order.total)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Budget Breakdown</Text>
          <EssentialitySplitBar
            essentialPct={snap.essentialPercentage}
            semiPct={snap.semiEssentialPercentage}
            discretionaryPct={snap.discretionaryPercentage}
          />
          <View style={{ marginTop: 8 }}>
            {snap.categoryBreakdown.map((cat) => (
              <CategorySpendRow key={cat.budgetCategoryId} cat={cat} />
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  scroll: { paddingHorizontal: 20 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  statusBadge: { alignSelf: 'flex-start', backgroundColor: brand.greenLight, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10, marginBottom: 20 },
  statusText: { fontSize: 13, fontWeight: '600', color: brand.green, textTransform: 'capitalize' },
  card: { backgroundColor: brand.grey50, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: brand.grey200, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: brand.grey900, marginBottom: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  itemName: { flex: 1, fontSize: 14, color: brand.grey700 },
  itemQty: { fontSize: 13, color: brand.grey400, marginRight: 12 },
  itemPrice: { fontSize: 14, fontWeight: '600', color: brand.grey900 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: brand.grey200, paddingTop: 12, marginTop: 8 },
  totalLabel: { fontSize: 15, fontWeight: '600', color: brand.grey700 },
  totalValue: { fontSize: 18, fontWeight: '700', color: brand.grey900 },
})
