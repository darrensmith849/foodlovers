import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { palette } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useOrderStore } from '@/stores/useOrderStore'

const STATUS_COLORS: Record<string, string> = {
  pending: palette.caution,
  confirmed: palette.leafTeal,
  picking: palette.caution,
  delivering: palette.leafTeal,
  delivered: palette.textSecondary,
}

export default function OrdersScreen() {
  const orders = useOrderStore((s) => s.orders)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Orders</Text>

        {orders.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📦</Text>
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtext}>Your order history will appear here</Text>
          </View>
        ) : (
          orders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => router.push(`/order/${order.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{order.id.slice(-3)}</Text>
                <View style={[styles.statusBadge, { backgroundColor: (STATUS_COLORS[order.status] ?? palette.textSecondary) + '18' }]}>
                  <Text style={[styles.statusText, { color: STATUS_COLORS[order.status] ?? palette.textSecondary }]}>
                    {order.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.orderItems}>
                {order.items.length} items · {formatPrice(order.total)}
              </Text>
              <Text style={styles.orderDate}>
                {new Date(order.createdAt).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
              </Text>
              <View style={styles.orderSplit}>
                <Text style={styles.splitLabel}>
                  {order.budgetSnapshot.essentialPercentage}% essential
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.oatCream },
  scroll: { paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: '800', color: palette.textDark, paddingTop: 12, marginBottom: 20, letterSpacing: -0.5 },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 18, fontWeight: '600', color: palette.textDark, marginBottom: 4 },
  emptySubtext: { fontSize: 14, color: palette.textSecondary },
  orderCard: { backgroundColor: palette.surfaceCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: palette.border, marginBottom: 12 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  orderId: { fontSize: 16, fontWeight: '600', color: palette.textDark },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize', letterSpacing: 0.3 },
  orderItems: { fontSize: 14, color: palette.textDark, marginBottom: 4 },
  orderDate: { fontSize: 12, color: palette.textSecondary, marginBottom: 8 },
  orderSplit: { flexDirection: 'row' },
  splitLabel: { fontSize: 12, color: palette.leafTeal, fontWeight: '500' },
})
