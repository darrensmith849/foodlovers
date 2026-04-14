import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { brand } from '@/constants/Colors'

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DJ</Text>
        </View>
        <Text style={styles.name}>Daniel</Text>
        <Text style={styles.market}>South Africa</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          <Text style={styles.cardSubtitle}>Account, notifications, and preferences</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order History</Text>
          <Text style={styles.cardSubtitle}>View past orders and spend breakdowns</Text>
        </View>
        <Text style={styles.version}>FoodLovers v0.1.0</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: brand.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: brand.green,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: brand.grey900,
    marginBottom: 4,
  },
  market: {
    fontSize: 14,
    color: brand.grey500,
    marginBottom: 32,
  },
  card: {
    width: '100%',
    backgroundColor: brand.grey50,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: brand.grey200,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: brand.grey900,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: brand.grey500,
  },
  version: {
    fontSize: 12,
    color: brand.grey400,
    marginTop: 'auto',
    marginBottom: 20,
  },
})
