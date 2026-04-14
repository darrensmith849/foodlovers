import { useState } from 'react'
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { brand } from '@/constants/Colors'
import { useUserStore } from '@/stores/useUserStore'

const PRESET_AMOUNTS = [200000, 350000, 500000, 750000]

export default function BudgetSetupScreen() {
  const setMonthlyBudget = useUserStore((s) => s.setMonthlyBudget)
  const completeOnboarding = useUserStore((s) => s.completeOnboarding)
  const [selected, setSelected] = useState(350000)
  const [custom, setCustom] = useState('')

  function handleContinue() {
    const amount = custom ? Math.round(parseFloat(custom) * 100) : selected
    if (amount > 0) {
      setMonthlyBudget(amount)
      completeOnboarding()
      router.replace('/(tabs)')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>💰</Text>
        <Text style={styles.title}>Set Your Monthly Budget</Text>
        <Text style={styles.desc}>
          How much do you typically spend on groceries each month? We'll help you track against this.
        </Text>

        <View style={styles.presets}>
          {PRESET_AMOUNTS.map((amount) => (
            <Pressable
              key={amount}
              style={[styles.preset, selected === amount && !custom && styles.presetActive]}
              onPress={() => { setSelected(amount); setCustom('') }}
            >
              <Text style={[styles.presetText, selected === amount && !custom && styles.presetTextActive]}>
                R{(amount / 100).toLocaleString()}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.orText}>or enter a custom amount</Text>
        <View style={styles.inputRow}>
          <Text style={styles.inputPrefix}>R</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="numeric"
            value={custom}
            onChangeText={setCustom}
            placeholderTextColor={brand.grey400}
          />
        </View>
      </View>

      <View style={styles.bottom}>
        <Pressable style={styles.primaryBtn} onPress={handleContinue}>
          <Text style={styles.primaryBtnText}>Start Shopping</Text>
        </Pressable>
        <Pressable style={styles.skipBtn} onPress={() => { completeOnboarding(); router.replace('/(tabs)') }}>
          <Text style={styles.skipText}>Skip for now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 40 },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: brand.grey900, marginBottom: 8, textAlign: 'center' },
  desc: { fontSize: 15, color: brand.grey500, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 20 },
  preset: { borderWidth: 1.5, borderColor: brand.grey200, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12 },
  presetActive: { borderColor: brand.green, backgroundColor: brand.greenLight },
  presetText: { fontSize: 16, fontWeight: '600', color: brand.grey700 },
  presetTextActive: { color: brand.green },
  orText: { fontSize: 13, color: brand.grey400, marginBottom: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: brand.grey200, borderRadius: 12, paddingHorizontal: 16, width: '60%' },
  inputPrefix: { fontSize: 20, fontWeight: '600', color: brand.grey500, marginRight: 4 },
  input: { flex: 1, fontSize: 20, fontWeight: '600', color: brand.grey900, paddingVertical: 12 },
  bottom: { paddingHorizontal: 24, paddingBottom: 16 },
  primaryBtn: { backgroundColor: brand.green, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { fontSize: 17, fontWeight: '700', color: brand.white },
  skipBtn: { alignItems: 'center', paddingVertical: 8 },
  skipText: { fontSize: 15, color: brand.grey400 },
})
