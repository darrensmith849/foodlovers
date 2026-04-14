import { Link, Stack } from 'expo-router'
import { StyleSheet, View, Text } from 'react-native'
import { brand } from '@/constants/Colors'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.emoji}>🔍</Text>
        <Text style={styles.title}>Page not found</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Back to Shop</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: brand.white },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: '600', color: brand.grey900, marginBottom: 12 },
  link: { paddingVertical: 12, paddingHorizontal: 20, backgroundColor: brand.greenLight, borderRadius: 10 },
  linkText: { fontSize: 15, fontWeight: '600', color: brand.green },
})
