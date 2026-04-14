import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { brand } from '@/constants/Colors'
import { formatPrice } from '@/hooks/useFormatPrice'
import { useOrderStore } from '@/stores/useOrderStore'

const STATUS_COLORS: Record<string, string> = {
  pending: brand.amber,
  confirmed: brand.green,
  picking: brand.amber,
  delivering: brand.green,
  delivered: brand.grey400,
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
            <Pressable
              key={order.id}
              style={styles.orderCard}
              onPress={() => router.push(`/order/${order.id}`)}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{order.id.slice(-3)}</Text>
                <View style={[styles.statusBadge, { backgroundColor: (STATUS_COLORS[order.status] ?? brand.grey400) + '18' }]}>
                  <Text style={[styles.statusText, { color: STATUS_COLORS[order.status] ?? brand.grey400 }]}>
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
            </Pressable>
          ))
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  scroll: { paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: '700', color: brand.grey900, paddingTop: 12, marginBottom: 20, letterSpacing: -0.5 },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 18, fontWeight: '600', color: brand.grey700, marginBottom: 4 },
  emptySubtext: { fontSize: 14, color: brand.grey400 },
  orderCard: { backgroundColor: brand.grey50, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: brand.grey200, marginBottom: 12 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  orderId: { fontSize: 16, fontWeight: '600', color: brand.grey900 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  orderItems: { fontSize: 14, color: brand.grey700, marginBottom: 4 },
  orderDate: { fontSize: 12, color: brand.grey400, marginBottom: 8 },
  orderSplit: { flexDirection: 'row' },
  splitLabel: { fontSize: 12, color: brand.green, fontWeight: '500' },
})
