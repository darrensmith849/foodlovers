import { View, Text, StyleSheet } from 'react-native'
import { palette } from '@/constants/Colors'

interface Props {
  essentialPct: number
  semiPct: number
  discretionaryPct: number
}

export function EssentialitySplitBar({ essentialPct, semiPct, discretionaryPct }: Props) {
  return (
    <View>
      <View style={styles.track}>
        {essentialPct > 0 && (
          <View style={[styles.seg, { width: `${essentialPct}%`, backgroundColor: palette.leafTeal, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }]} />
        )}
        {semiPct > 0 && (
          <View style={[styles.seg, { width: `${semiPct}%`, backgroundColor: palette.caution }]} />
        )}
        {discretionaryPct > 0 && (
          <View style={[styles.seg, { width: `${discretionaryPct}%`, backgroundColor: palette.papayaCoral, borderTopRightRadius: 4, borderBottomRightRadius: 4 }]} />
        )}
      </View>
      <View style={styles.legend}>
        <LegendItem color={palette.leafTeal} label={`Essential ${essentialPct}%`} />
        <LegendItem color={palette.caution} label={`Semi ${semiPct}%`} />
        <LegendItem color={palette.papayaCoral} label={`Treats ${discretionaryPct}%`} />
      </View>
    </View>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  seg: { height: 8 },
  legend: { flexDirection: 'row', justifyContent: 'space-between' },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 7, height: 7, borderRadius: 4, marginRight: 4 },
  legendText: { fontSize: 11, color: palette.textSecondary },
})
