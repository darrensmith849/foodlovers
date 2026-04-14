import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { brand } from '@/constants/Colors'
import { useUserStore } from '@/stores/useUserStore'
import { formatPrice } from '@/hooks/useFormatPrice'

export default function ProfileScreen() {
  const { name, phone, email, market, monthlyBudget } = useUserStore()
  const marketLabel = market === 'ZA' ? 'South Africa' : 'Zimbabwe'

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.slice(0, 2).toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.market}>{marketLabel}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        <ProfileRow icon="phone" label="Phone" value={phone} />
        <ProfileRow icon="envelope" label="Email" value={email} />
        <ProfileRow icon="map-marker" label="Market" value={marketLabel} />

        <Text style={styles.sectionTitle}>Budget</Text>
        <ProfileRow icon="money" label="Monthly Budget" value={formatPrice(monthlyBudget)} />

        <Text style={styles.sectionTitle}>App</Text>
        <ProfileRow icon="bell" label="Notifications" value="Coming soon" />
        <ProfileRow icon="question-circle" label="Help & Support" value="Coming soon" />
        <ProfileRow icon="info-circle" label="About" value="v0.1.0" />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function ProfileRow({ icon, label, value }: { icon: React.ComponentProps<typeof FontAwesome>['name']; label: string; value: string }) {
  return (
    <View style={styles.row}>
      <FontAwesome name={icon} size={16} color={brand.grey400} style={styles.rowIcon} />
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  scroll: { paddingHorizontal: 20 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingTop: 20, paddingBottom: 28 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: brand.greenLight, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 22, fontWeight: '700', color: brand.green },
  name: { fontSize: 22, fontWeight: '700', color: brand.grey900 },
  market: { fontSize: 14, color: brand.grey500, marginTop: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: brand.grey400, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, marginTop: 20 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: brand.grey100 },
  rowIcon: { width: 24 },
  rowLabel: { flex: 1, fontSize: 15, color: brand.grey700 },
  rowValue: { fontSize: 14, color: brand.grey400 },
})
