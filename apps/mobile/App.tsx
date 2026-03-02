import { Linking, Pressable, ScrollView, Text, View } from 'react-native';

const items = [{ id: '1', title: 'Silk Pajama Set', affiliateUrl: 'https://amazon.com' }];

export default function App() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text accessibilityRole="header" style={{ fontSize: 28, fontWeight: '700' }}>Pamper Me</Text>
      <Text>Public wishlist shell with Amazon gifting CTA.</Text>
      {items.map((item) => (
        <View key={item.id} style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>{item.title}</Text>
          <Pressable onPress={() => Linking.openURL(item.affiliateUrl)} accessibilityLabel="Gift via Amazon">
            <Text style={{ color: '#d97706', marginTop: 8 }}>Gift via Amazon</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}
