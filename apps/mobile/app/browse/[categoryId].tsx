import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { PRODUCTS, BUDGET_CATEGORIES } from '@foodlovers/mock-data'
import { brand } from '@/constants/Colors'
import { ScreenHeader } from '@/components/ui/ScreenHeader'
import { ProductCard } from '@/components/ui/ProductCard'
import { CartFab } from '@/components/ui/CartFab'

export default function BrowseCategoryScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>()
  const category = BUDGET_CATEGORIES.find((c) => c.id === categoryId)
  const products = PRODUCTS.filter((p) => p.market === 'ZA' && p.budgetCategoryId === categoryId)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title={category?.name ?? 'Category'} showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.count}>{products.length} products</Text>
        <View style={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </View>
        {products.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No products in this category yet</Text>
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
      <CartFab />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  scroll: { paddingHorizontal: 20 },
  count: { fontSize: 13, color: brand.grey400, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 15, color: brand.grey400 },
})
