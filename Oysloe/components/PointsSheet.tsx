import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, PanResponder, StyleProp, ViewStyle } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function PointsSheet({ visible, onClose }: Props) {
  const translateY = React.useRef(new Animated.Value(0)).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 6,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(Math.min(g.dy, 320));
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 120) {
          Animated.timing(translateY, { toValue: 400, duration: 180, useNativeDriver: true }).start(onClose as any);
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (visible) {
      translateY.setValue(400);
      Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }).start();
    }
  }, [visible, translateY]);

  const transactions = [
    { date: 'Apr 7, 2024', points: 20, amount: 4.3 },
    { date: 'Apr 6, 2024', points: 12, amount: 2.1 },
    { date: 'Apr 5, 2024', points: 8, amount: 1.2 },
  ];

  if (!visible) return null;

  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}> 
      <View style={styles.sheetOverlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View style={[styles.pointsCardSheet, { transform: [{ translateY }] }]} {...panResponder.panHandlers}>
          <View style={styles.sheetHandle} />
          <View style={styles.withdrawPill}>
            <Text style={styles.withdrawText}>Withdraw</Text>
          </View>
          <Text style={styles.balanceLabel}>Balance: ₵10</Text>
          <View style={{ height: 16 }} />
          <Text style={styles.paymentTitle}>Payment</Text>
          <Text style={styles.recentTransactions}>Recent transactions</Text>
          <View style={styles.txDivider} />

          {transactions.map((tx, idx) => (
            <View key={idx} style={styles.txRow}>
              <Text style={styles.txLabel}>{tx.date} • {tx.points} points</Text>
              <Text style={styles.txAmount}>₵ {tx.amount}</Text>
            </View>
          ))}

        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheetOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  pointsCardSheet: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 18 },
  sheetHandle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: '#d1d5db', marginBottom: 12 },
  withdrawPill: { alignSelf: 'center', paddingHorizontal: 28, paddingVertical: 8, backgroundColor: '#f3f4f6', borderRadius: 20, marginBottom: 10 },
  withdrawText: { fontSize: 16, fontWeight: '600' },
  balanceLabel: { alignSelf: 'center', fontSize: 16, marginTop: 6 },
  paymentTitle: { marginTop: 12, fontWeight: '700' },
  recentTransactions: { color: '#9aa3ad', marginTop: 2 },
  txDivider: { height: 1, backgroundColor: '#e6e7ea', marginVertical: 8 },
  txRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  txLabel: { color: '#6b7280' },
  txAmount: { fontWeight: '600' },
});
