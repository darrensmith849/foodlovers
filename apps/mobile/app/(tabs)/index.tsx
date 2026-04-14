import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

// Workspace import smoke test
import type { Product } from '@foodlovers/types';
import { categoriseProduct } from '@foodlovers/budgeting-engine';
import { PRODUCTS } from '@foodlovers/mock-data';

const sampleProduct: Product = PRODUCTS[0];
const classification = categoriseProduct(sampleProduct);

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Workspace import proof — remove after smoke test */}
      <View style={styles.proof}>
        <Text style={styles.proofTitle}>Workspace Imports OK</Text>
        <Text style={styles.proofText}>Product: {sampleProduct.name}</Text>
        <Text style={styles.proofText}>Price: {sampleProduct.currencyCode} {sampleProduct.price}</Text>
        <Text style={styles.proofText}>Budget Category: {classification.budgetCategoryId}</Text>
        <Text style={styles.proofText}>Essentiality: {classification.essentialityTier}</Text>
      </View>

      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  proof: {
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#22C55E',
    borderRadius: 8,
    width: '80%',
  },
  proofTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#22C55E',
    marginBottom: 8,
  },
  proofText: {
    fontSize: 12,
    marginBottom: 2,
  },
});
