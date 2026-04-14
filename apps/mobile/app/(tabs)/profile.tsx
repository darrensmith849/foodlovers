import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { palette } from '@/constants/Colors'
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
      <FontAwesome name={icon} size={15} color={palette.textSecondary} style={styles.rowIcon} />
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.oatCream },
  scroll: { paddingHorizontal: 20 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingTop: 20, paddingBottom: 28 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: palette.deepAubergine, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20, fontWeight: '700', color: palette.yuzuLime },
  name: { fontSize: 22, fontWeight: '700', color: palette.textDark },
  market: { fontSize: 13, color: palette.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: 11, fontWeight: '600', color: palette.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, marginTop: 24 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: palette.border },
  rowIcon: { width: 24 },
  rowLabel: { flex: 1, fontSize: 15, color: palette.textDark },
  rowValue: { fontSize: 13, color: palette.textSecondary },
})
