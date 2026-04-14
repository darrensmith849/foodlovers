import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { palette } from '@/constants/Colors'

interface ScreenHeaderProps {
  title: string
  subtitle?: string
  showBack?: boolean
  rightAction?: React.ReactNode
}

export function ScreenHeader({ title, subtitle, showBack, rightAction }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {showBack && (
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="chevron-left" size={16} color={palette.textDark} />
          </Pressable>
        )}
        <View>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      {rightAction}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 8, marginLeft: -8 },
  title: { fontSize: 22, fontWeight: '700', color: palette.textDark, letterSpacing: -0.3 },
  subtitle: { fontSize: 12, color: palette.textSecondary, marginBottom: 1 },
})
