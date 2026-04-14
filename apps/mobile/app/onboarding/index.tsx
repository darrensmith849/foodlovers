import { StyleSheet, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { brand } from '@/constants/Colors'

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🛒</Text>
        <Text style={styles.title}>FoodLovers</Text>
        <Text style={styles.subtitle}>Shop smarter. Spend wiser.</Text>
        <Text style={styles.desc}>
          A grocery delivery app that helps you understand where your money goes — so you can eat well and save more.
        </Text>
        <View style={styles.features}>
          <Feature icon="🥬" text="Fresh groceries delivered" />
          <Feature icon="📊" text="See exactly where you spend" />
          <Feature icon="💡" text="Smart budget insights" />
        </View>
      </View>
      <View style={styles.bottom}>
        <Pressable style={styles.primaryBtn} onPress={() => router.push('/onboarding/budget-setup')}>
          <Text style={styles.primaryBtnText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

function Feature({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.feature}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 36, fontWeight: '800', color: brand.grey900, letterSpacing: -1, marginBottom: 8 },
  subtitle: { fontSize: 18, color: brand.green, fontWeight: '600', marginBottom: 16 },
  desc: { fontSize: 15, color: brand.grey500, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  features: { width: '100%', gap: 16 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureIcon: { fontSize: 24 },
  featureText: { fontSize: 15, color: brand.grey700, fontWeight: '500' },
  bottom: { paddingHorizontal: 24, paddingBottom: 16 },
  primaryBtn: { backgroundColor: brand.green, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { fontSize: 17, fontWeight: '700', color: brand.white },
})
