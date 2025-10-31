import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function NoInternetScreen() {
  return (
    _jsxs(SafeAreaView, { style: styles.safe, children: [
      _jsxs(View, { style: styles.header, children: [
        _jsxs(TouchableOpacity, { style: styles.backBtn, onPress: () => router.back(), children: [
          _jsx(Text, { style: styles.backIcon, children: "\u2190" }),
          _jsx(Text, { style: styles.backLabel, children: "Back" })] }
        ),
        _jsx(View, { style: { width: 120 } })] }
      ),

      _jsxs(View, { style: styles.center, children: [
        _jsx(View, { style: styles.iconWrap, children:
          _jsx(Image, {
            source: require('@/oysloe-assets/Ad details screen/No internet.png'),
            style: { width: 160, height: 160 } }
          ) }
        ),
        _jsx(Text, { style: styles.title, children: "Poor internet network." }),
        _jsx(Text, { style: styles.subtitle, children: "Check your connection" }),
        _jsx(Text, { style: styles.subtitle, children: "and try again!" })] }
      )] }
    ));

}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8
  },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { color: '#9aa3af', marginRight: 4 },
  backLabel: { color: '#9aa3af' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconWrap: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#eafaf2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  title: { color: '#374151', marginTop: 8 },
  subtitle: { color: '#374151' }
});