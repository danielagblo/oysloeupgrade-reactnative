import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function TermsAndConditionsScreen() {
  return (
    _jsxs(SafeAreaView, { style: styles.safe, children: [
      _jsxs(View, { style: styles.header, children: [
        _jsxs(TouchableOpacity, { style: styles.backBtn, onPress: () => router.back(), children: [
          _jsx(Text, { style: styles.backIcon, children: "\u2190" }),
          _jsx(Text, { style: styles.backLabel, children: "Back" })] }
        ),
        _jsx(Text, { style: styles.headerTitle, children: "T&C" }),
        _jsx(View, { style: { width: 44 } })] }
      ),

      _jsxs(View, { style: styles.content, children: [
        _jsx(Text, { style: styles.title, children: "Privacy Policy" }),
        _jsx(Text, { style: styles.date, children: "Dated: 23-3-2025" }),

        _jsx(View, { style: { height: 20 } }),
        _jsx(Text, { style: styles.bodyText, children: "Your friend sign up using your link" })] }
      )] }
    ));

}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f8fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eef0f2'
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  backIcon: { color: '#9aa3af', marginRight: 4 },
  backLabel: { color: '#9aa3af' },
  headerTitle: { fontSize: 14, color: '#6b7280' },
  content: { paddingHorizontal: 16, paddingTop: 16 },
  title: { color: '#4b5563', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  date: { color: '#9aa3af', fontSize: 12 },
  bodyText: { color: '#9aa3af', fontSize: 13 }
});