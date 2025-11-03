import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router } from 'expo-router';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const items = [1, 2, 3];

export default function SelectionsScreen() {
  return (
    _jsxs(SafeAreaView, { style: styles.container, children: [
      _jsxs(View, { style: styles.header, children: [
        _jsx(TouchableOpacity, { onPress: () => router.back(), style: styles.backBtn, children:
          _jsx(Text, { style: styles.backText, children: "\u2190 Back" })
        }),
        _jsx(Text, { style: styles.headerTitle, children: "Selections" }),
        _jsx(View, { style: { width: 40 } })] }
      ),

      _jsx(ScrollView, { children:
        items.map((i) =>
          _jsxs(View, { style: styles.card, children: [
            _jsx(Image, { source: require('@/oysloe-assets/Ad images/grey-ocar.png'), style: styles.thumb }),
            _jsxs(View, { style: styles.cardContent, children: [
              _jsx(Text, { style: styles.location, children: "Santamaria-kotobabi" }),
              _jsx(Text, { style: styles.title, children: "Mercedes Benz S CLASS 2023" }),
              _jsx(Text, { style: styles.meta, children: "₵ 120 for 6 days" })] }
            )] }, `sel-${i}`)
        ) }
      )] }
    ));
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#00000020'
  },
  backBtn: { paddingVertical: 8, paddingHorizontal: 6 },
  backText: { fontSize: 14, color: '#636060cf' },
  headerTitle: { fontSize: 12, color: '#636060cf' },
  card: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#f0f2f4' },
  thumb: { width: 80, height: 50, borderRadius: 6, marginRight: 10 },
  cardContent: { flex: 1 },
  location: { fontSize: 9, color: '#8a97a3', marginBottom: 3 },
  title: { fontSize: 12, color: '#374957', marginBottom: 2 },
  meta: { fontSize: 10, color: '#8a97a3' }
});
