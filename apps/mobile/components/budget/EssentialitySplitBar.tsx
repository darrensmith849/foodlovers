import { View, Text, StyleSheet } from 'react-native'
import { brand } from '@/constants/Colors'

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
          <View style={[styles.seg, { width: `${essentialPct}%`, backgroundColor: brand.green, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }]} />
        )}
        {semiPct > 0 && (
          <View style={[styles.seg, { width: `${semiPct}%`, backgroundColor: brand.amber }]} />
        )}
        {discretionaryPct > 0 && (
          <View style={[styles.seg, { width: `${discretionaryPct}%`, backgroundColor: brand.orange, borderTopRightRadius: 4, borderBottomRightRadius: 4 }]} />
        )}
      </View>
      <View style={styles.legend}>
        <LegendItem color={brand.green} label={`Essential ${essentialPct}%`} />
        <LegendItem color={brand.amber} label={`Semi ${semiPct}%`} />
        <LegendItem color={brand.orange} label={`Treats ${discretionaryPct}%`} />
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
  track: { flexDirection: 'row', height: 10, borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  seg: { height: 10 },
  legend: { flexDirection: 'row', justifyContent: 'space-between' },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
  legendText: { fontSize: 11, color: brand.grey500 },
})
