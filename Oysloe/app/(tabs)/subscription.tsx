import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import { router } from 'expo-router';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image } from 'expo-image';



type PlanKey = 'basic' | 'business' | 'platinum';

const PLAN_STATUS: Record<PlanKey, {
  badge: string;
  badgeColor: string;
  badgeTextColor: string;
  expiry: string;
  expiryBg: string;
  expiryTextColor: string;
  heading: string;
  body: string;
  cardBg: string;
  textColor: string;
  subTextColor: string;
}> = {
  basic: {
    heading: "You're currently subscribed",
    body: 'Switch your plan at anytime',
    badge: 'Basic package',
    badgeColor: '#34D399',
    badgeTextColor: '#064E3B',
    expiry: 'Expires in 7 days',
    expiryBg: '#F3F4F6',
    expiryTextColor: '#4B5563',
    cardBg: '#FFFFFF',
    textColor: '#111827',
    subTextColor: '#6B7280'
  },
  business: {
    heading: 'Thanks for upgrading',
    body: "You're enjoying the Business plan benefits",
    badge: 'Business',
    badgeColor: '#00FFF2',
    badgeTextColor: '#00332F',
    expiry: 'Expires in 14 days',
    expiryBg: '#F3F4F6',
    expiryTextColor: '#4B5563',
    cardBg: '#FFFFFF',
    textColor: '#111827',
    subTextColor: '#6B7280'
  },
  platinum: {
    heading: 'Top tier status',
    body: "You're riding the Platinum wave",
    badge: 'Platinum',
    badgeColor: '#FF6B6B',
    badgeTextColor: '#480909',
    expiry: 'Expires in 30 days',
    expiryBg: '#F3F4F6',
    expiryTextColor: '#4B5563',
    cardBg: '#FFFFFF',
    textColor: '#111827',
    subTextColor: '#6B7280'
  }
};

export default function SubscriptionScreen() {
  const [selected, setSelected] = React.useState<PlanKey>('basic');
  const [showPaid, setShowPaid] = React.useState(false);

  const PlanCard = ({
    title,
    multiplier,
    perks,
    price,
    strike,
    selected: isSelected,
    onPress
  }: {
    title: string;
    multiplier: string;
    perks: string[];
    price: string;
    strike?: string;
    selected: boolean;
    onPress: () => void;








  }) =>
  _jsxs(TouchableOpacity, { activeOpacity: 0.9, onPress: onPress, style: [styles.card, isSelected && styles.cardSelected], children: [
    isSelected ?
    _jsx(View, { style: styles.badgeWrap, children: _jsx(Text, { style: styles.badgeText, children: "For you 50% off" }) }) :
    null,
    _jsxs(View, { style: styles.cardHeaderRow, children: [
      _jsx(Text, { style: styles.cardTitle, children: title }),
      _jsx(Text, { style: styles.cardMultiplier, children: multiplier })] }
    ),
    _jsx(View, { style: { height: 8 } }),
    perks.map((p: string, i: number) =>
    _jsxs(View, { style: styles.perkRow, children: [
      _jsx(Text, { style: styles.perkTick, children: "\u2713" }),
      _jsx(Text, { style: styles.perkText, children: p })] }, i
    )
    ),
    _jsxs(View, { style: styles.priceRow, children: [
      _jsxs(Text, { style: styles.priceText, children: ["\xA2 ", price] }),
      strike ? _jsxs(Text, { style: styles.strikeText, children: ["\xA2 ", strike] }) : null] }
    )] }
  );


  const PlanStatusCard = ({ plan }: { plan: PlanKey }) => {
    const config = PLAN_STATUS[plan];
    const isLightCard = plan === 'basic';
    return (
      _jsxs(View, { style: [styles.statusCard, { backgroundColor: config.cardBg }], children: [
        _jsxs(View, { style: { flex: 1 }, children: [
          _jsx(Text, { style: [styles.statusHeading, { color: config.textColor }], children: config.heading }),
          _jsx(Text, { style: [styles.statusBody, { color: config.subTextColor }], children: config.body }),
          _jsxs(View, { style: styles.statusBadgeRow, children: [
            _jsx(View, { style: [styles.statusBadge, { backgroundColor: config.badgeColor }], children:
              _jsx(Text, { style: [styles.statusBadgeText, { color: config.badgeTextColor }], children: config.badge })
            }),
            _jsx(View, { style: [styles.statusExpiry, { backgroundColor: config.expiryBg }], children:
              _jsx(Text, { style: [styles.statusExpiryText, { color: config.expiryTextColor }], children: config.expiry })
            })] }
          )] }
        ),
        _jsxs(View, { style: [styles.statusDecor], children: [
          _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/sub-logo.png'), style: styles.statusLogo, contentFit: "contain" })] }
        )] }
      )
    );
  };

  return (
    _jsxs(SafeAreaView, { style: styles.safe, children: [
      _jsxs(View, { style: styles.header, children: [
        _jsxs(TouchableOpacity, { style: styles.backBtn, onPress: () => router.back(), children: [
          _jsx(Text, { style: styles.backIcon, children: "\u2190" }),
          _jsx(Text, { style: styles.backLabel, children: "Back" })] }
        ),
        _jsx(Text, { style: styles.headerTitle, children: "Subscription" }),
        _jsx(View, { style: { width: 44 } })] }
      ),

      _jsxs(ScrollView, { contentContainerStyle: styles.content, showsVerticalScrollIndicator: false, children: [
        _jsx(Text, { style: styles.subtitle, children: "Choose a monthly plan that works for you" }),

        _jsx(PlanStatusCard, { plan: selected }),

        _jsx(PlanCard, {
          title: "Basic",
          multiplier: "1.5x",
          perks: ["Share limited number of ads", "All ads stays promoted for a week"],
          price: "567",
          strike: "567",
          selected: selected === 'basic',
          onPress: () => setSelected('basic') }
        ),

        _jsx(PlanCard, {
          title: "Business",
          multiplier: "4x",
          perks: ["Pro partnership status", "All ads stays promoted for a month"],
          price: "567",
          strike: "567",
          selected: selected === 'business',
          onPress: () => setSelected('business') }
        ),

        _jsx(PlanCard, {
          title: "Platinum",
          multiplier: "10x",
          perks: ["Unlimited number of ads", "Sell 10x faster in all categories"],
          price: "567",
          strike: "567",
          selected: selected === 'platinum',
          onPress: () => setSelected('platinum') }
        ),

        _jsx(View, { style: { height: 16 } }),
        _jsx(TouchableOpacity, { style: styles.payBtn, activeOpacity: 0.9, onPress: () => setShowPaid(true), children:
          _jsx(Text, { style: styles.payText, children: "Pay Now" }) }
        ),
        _jsx(View, { style: { height: 24 } })] }
      ),
      _jsx(SuccessPopup, { visible: showPaid, onClose: () => setShowPaid(false) })] }
    ));

}

function SuccessPopup({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    _jsx(Modal, { transparent: true, visible: visible, animationType: "fade", onRequestClose: onClose, children:
      _jsx(View, { style: styles.modalOverlay, children:
        _jsxs(View, { style: styles.modalCard, children: [
          _jsx(Image, { source: require('@/oysloe-assets/Ads/success.png'), style: { width: 70, height: 70, marginBottom: 10 } }),
          _jsx(Text, { style: styles.modalTitle, children: "Payment sent" }),
          _jsxs(View, { style: styles.modalBtnRow, children: [
            _jsx(TouchableOpacity, { style: [styles.modalBtn, styles.modalBtnGhost], onPress: () => {
              onClose();
              router.replace('/(tabs)');
            }, children:
              _jsx(Text, { style: styles.modalBtnGhostText, children: "Home" }) }
            ),
            _jsx(TouchableOpacity, { style: [styles.modalBtn, styles.modalBtnGhost], onPress: onClose, children:
              _jsx(Text, { style: styles.modalBtnGhostText, children: "Close" }) }
            )] }
          )] }
        ) }
      ) }
    )
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f8fa' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 6, paddingBottom: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eef0f2' },
  backBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  backIcon: { color: '#9aa3af', marginRight: 4 },
  backLabel: { color: '#9aa3af' },
  headerTitle: { fontSize: 14, color: '#6b7280' },
  content: { paddingHorizontal: 12, paddingTop: 28, paddingBottom: 12 },
  subtitle: { color: '#9aa3af', fontSize: 12, marginBottom: 18, marginLeft: 4 },
  statusCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 18, padding: 18, marginBottom: 20 },
  statusHeading: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  statusBody: { fontSize: 12, marginBottom: 14 },
  statusBadgeRow: { flexDirection: 'row', alignItems: 'center' },
  statusBadge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999 },
  statusBadgeText: { fontWeight: '600', fontSize: 11 },
  statusExpiry: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999, marginLeft: 10 },
  statusExpiryText: { fontWeight: '500', fontSize: 11 },
  statusDecor: { width: 76, height: 76, borderRadius: 38, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  statusCircleLarge: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', position: 'absolute' },
  statusCircleSmall: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.65)', position: 'absolute', bottom: 12, right: 22 },
  statusDecorLight: { backgroundColor: '#ECFDF5' },
  statusCircleLightBorder: { borderColor: '#D1FAE5' },
  statusCircleLight: { backgroundColor: '#34D399' },
  statusLogo: { width: 56, height: 56, borderRadius: 8 },

  card: { backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#eef0f2', position: 'relative' },
  cardSelected: { borderColor: '#333' },
  badgeWrap: { position: 'absolute', top: -12, right: 10, backgroundColor: '#374151', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeText: { color: '#ffffff', fontSize: 10 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { color: '#111827', fontWeight: '700' },
  cardMultiplier: { marginLeft: 6, fontSize: 10, color: '#9aa3af' },
  perkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  perkTick: { color: '#111827', marginRight: 8 },
  perkText: { color: '#6b7280', fontSize: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  priceText: { color: '#111827', fontWeight: '700' },
  strikeText: { color: '#9aa3af', textDecorationLine: 'line-through', marginLeft: 10 },
  payBtn: { backgroundColor: '#fff', borderRadius: 16, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#eceff3', marginHorizontal: 4 },
  payText: { color: '#111827', fontWeight: '600' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modalCard: { width: '86%', maxWidth: 380, backgroundColor: '#fff', borderRadius: 18, paddingVertical: 26, paddingHorizontal: 20, alignItems: 'center' },
  modalIconWrap: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#66FF99', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  modalTick: { fontSize: 0 },
  modalTitle: { fontSize: 18, color: '#111827', fontWeight: '600', marginBottom: 14 },
  modalBtnRow: { flexDirection: 'row', gap: 12 },
  modalBtn: { paddingVertical: 10, paddingHorizontal: 22, borderRadius: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: '#eceff3' },
  modalBtnGhost: { backgroundColor: '#fff' },
  modalBtnGhostText: { color: '#111827', fontWeight: '600' }
});