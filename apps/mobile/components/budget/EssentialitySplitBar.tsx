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
          <View style={[styles.seg, { width: `${essentialPct}%`, backgroundColor: palette.positive, borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }]} />
        )}
        {semiPct > 0 && (
          <View style={[styles.seg, { width: `${semiPct}%`, backgroundColor: palette.caution }]} />
        )}
        {discretionaryPct > 0 && (
          <View style={[styles.seg, { width: `${discretionaryPct}%`, backgroundColor: palette.warning, borderTopRightRadius: 3, borderBottomRightRadius: 3 }]} />
        )}
      </View>
      <View style={styles.legend}>
        <LegendItem color={palette.positive} label={`Essential ${essentialPct}%`} />
        <LegendItem color={palette.caution} label={`Semi ${semiPct}%`} />
        <LegendItem color={palette.warning} label={`Treats ${discretionaryPct}%`} />
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
  track: { flexDirection: 'row', height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 10 },
  seg: { height: 6 },
  legend: { flexDirection: 'row', justifyContent: 'space-between' },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 4 },
  legendText: { fontSize: 11, color: palette.textMuted },
})
