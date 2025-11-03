import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router } from 'expo-router';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width } = Dimensions.get('window');

type AlertItem = {
  id: string;
  time: string; // e.g., '10 mins ago'
  avatar: 'oysloe' | 'adwoa';
  title: string;
  body: React.ReactNode;
  read?: boolean;
  section: 'Today' | 'Yesterday';
};

export default function AlertsScreen() {
  const initialData: AlertItem[] = useMemo(() => ([
    {
      id: 'a1', section: 'Today', time: '10 mins ago', avatar: 'oysloe',
      title: 'Oysloe',
      body: (
        _jsxs(Text, { style: styles.bodyText, children: [
          "We're excited to have you onboard. You've taken the first step toward smarter shopping and selling. Big things await — stay tuned!"
        ] })
      )
    },
    {
      id: 'a2', section: 'Yesterday', time: '10 mins ago', avatar: 'oysloe',
      title: 'Oysloe',
      body: _jsxs(Text, { style: styles.bodyText, children: ["Your subscription expires in 7 days "] })
    },
    {
      id: 'a3', section: 'Yesterday', time: '10 mins ago', avatar: 'oysloe',
      title: 'Oysloe',
      body: _jsxs(Text, { style: styles.bodyText, children: ["Your subscription expires in 3 days "] })
    },
    {
      id: 'a4', section: 'Yesterday', time: '10 mins ago', avatar: 'oysloe',
      title: 'Oysloe',
      body: _jsxs(Text, { style: styles.bodyText, children: ["Your subscription is expired ", _jsx(Text, { style: styles.link, onPress: () => router.push('/subscription'), children: 'Subscribe' })] })
    },
    {
      id: 'a5', section: 'Yesterday', time: '10 mins ago', avatar: 'oysloe',
      title: 'Oysloe',
      body: _jsxs(Text, { style: styles.bodyText, children: ["we hand picked few items for you ", _jsx(Text, { style: styles.link, onPress: () => router.push('/(tabs)/selections'), children: 'show listings' })] })
    },
    {
      id: 'a6', section: 'Yesterday', time: '10 mins ago', avatar: 'adwoa',
      title: 'Akosua Amassa',
      body: _jsxs(Text, { style: styles.bodyText, children: [" Made a review on your ad ", _jsx(Text, { style: styles.link, children: 'Open' })] })
    },
    {
      id: 'a7', section: 'Yesterday', time: '10 mins ago', avatar: 'oysloe',
      title: 'Oysloe',
      body: _jsx(Text, { style: styles.bodyText, children: "We've given you a free coupon,Your code to redeem is GH32432" })
    },
    {
      id: 'a8', section: 'Yesterday', time: '10 mins ago', avatar: 'oysloe',
      title: 'Oysloe',
      body: _jsxs(Text, { style: styles.bodyText, children: ["Your ad ", _jsx(Text, { style: styles.strong, children: 'Samsung s6 ultra.' }), " is reported as taken. Verify and update the status now!. Be informed you'll face suspension if there's multiple report on this ad."] })
    }
  ]), []);

  const [alerts, setAlerts] = useState<AlertItem[]>(initialData);
  const [showMenu, setShowMenu] = useState(false);
  const [allRead, setAllRead] = useState(false);

  const grouped = useMemo(() => ({
    Today: alerts.filter(a => a.section === 'Today'),
    Yesterday: alerts.filter(a => a.section === 'Yesterday')
  }), [alerts]);

  const onClearAll = () => {
    setShowMenu(false);
    setAlerts([]);
  };
  const onMarkRead = () => {
    setShowMenu(false);
    setAllRead(true);
  };

  const renderRow = (item: AlertItem) => (
    _jsxs(View, { style: styles.row, children: [
      _jsx(Image, { source: item.avatar === 'oysloe' ? require('@/oysloe-assets/Ad details screen/oysloe icon.png') : require('@/oysloe-assets/Ad details screen/Adwoa.png'), style: styles.avatar }),
      _jsxs(View, { style: styles.rowContent, children: [
        _jsxs(View, { style: styles.rowHeader, children: [
          _jsx(Text, { style: styles.title, children: item.title }),
          _jsx(Text, { style: styles.time, children: item.time })] }
        ),
        _jsx(View, { children: item.body })] }
      )] }
    )
  );

  if (alerts.length === 0) {
    return (
      _jsxs(SafeAreaView, { style: styles.container, children: [
        _jsxs(View, { style: styles.header, children: [
          _jsx(TouchableOpacity, { onPress: () => router.back(), style: styles.backBtn, children:
            _jsx(Text, { style: styles.backText, children: "\u2190 Back" })
          }),
          _jsx(Text, { style: styles.headerTitle, children: "Alerts" }),
          _jsx(TouchableOpacity, { onPress: () => setShowMenu(!showMenu), style: styles.menuBtn, children:
            _jsx(Text, { style: styles.menuDots, children: "\u22EE" })
          })] }
        ),
        _jsxs(View, { style: styles.content, children: [
          _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/no-notification.png'), style: styles.illustration, contentFit: "contain" })] }
        )] }
      )
    );
  }

  return (
    _jsxs(SafeAreaView, { style: styles.container, children: [
      _jsxs(View, { style: styles.header, children: [
        _jsx(TouchableOpacity, { onPress: () => router.back(), style: styles.backBtn, children:
          _jsx(Text, { style: styles.backText, children: "\u2190 Back" })
        }),
        _jsx(Text, { style: styles.headerTitle, children: "Alerts" }),
        _jsx(TouchableOpacity, { onPress: () => setShowMenu(!showMenu), style: styles.menuBtn, children:
          _jsx(Text, { style: styles.menuDots, children: "\u22EE" })
        })] }
      ),

      _jsx(ScrollView, { style: { flex: 1 }, children:
        _jsxs(View, { children: [
          grouped.Today.length > 0 && _jsxs(View, { children: [
            _jsx(Text, { style: styles.sectionLabel, children: "Today" }),
            grouped.Today.map(a => _jsx(View, { style: [styles.rowWrap, allRead && styles.rowDim], children: renderRow(a) }, a.id))] }
          ),
          grouped.Yesterday.length > 0 && _jsxs(View, { children: [
            _jsx(Text, { style: styles.sectionLabel, children: "Yesterday" }),
            grouped.Yesterday.map(a => _jsx(View, { style: [styles.rowWrap, allRead && styles.rowDim], children: renderRow(a) }, a.id))] }
          )] }
        ) }
      ),

      showMenu && _jsxs(View, { style: styles.bottomSheet, children: [
        _jsx(View, { style: styles.sheetHandle }),
        _jsx(TouchableOpacity, { style: styles.sheetBtn, onPress: onClearAll, children:
          _jsx(Text, { style: styles.sheetBtnText, children: "Clear all" })
        }),
        _jsx(TouchableOpacity, { style: styles.sheetBtnGhost, onPress: onMarkRead, children:
          _jsx(Text, { style: styles.sheetBtnGhostText, children: "Mark as read" })
        })] }
      )] }
    )
  );
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
  headerTitle: { fontSize: 15, color: '#636060cf' },
  menuBtn: { paddingHorizontal: 8, paddingVertical: 8 },
  menuDots: { fontSize: 18, color: '#636060cf' },

  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  illustration: { width: 240, height: 240, marginBottom: 16 },

  sectionLabel: { fontSize: 11, color: '#8a97a3', paddingHorizontal: 12, paddingVertical: 8 },
  rowWrap: { backgroundColor: '#fff' },
  rowDim: { opacity: 0.55 },
  row: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f2f4' },
  avatar: { width: 34, height: 34, borderRadius: 17, marginRight: 10 },
  rowContent: { flex: 1 },
  rowHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  title: { fontSize: 11, color: '#1f2a33', fontWeight: '700' },
  time: { fontSize: 9, color: '#9aa7b2' },
  bodyText: { fontSize: 11, color: '#5a6a75', lineHeight: 15 },
  link: { color: '#1f3c88', fontWeight: '700' },
  strong: { fontWeight: '700' },

  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingBottom: 18,
    paddingTop: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
    elevation: 6
  },
  sheetHandle: { alignSelf: 'center', width: 60, height: 6, borderRadius: 3, backgroundColor: '#e7eaef', marginBottom: 8 },
  sheetBtn: { alignSelf: 'center', backgroundColor: '#f4f6f8', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, marginBottom: 6 },
  sheetBtnText: { color: '#2a3a44', fontSize: 13, fontWeight: '700' },
  sheetBtnGhost: { alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 6 },
  sheetBtnGhostText: { color: '#7c8b95', fontSize: 12 }
});
