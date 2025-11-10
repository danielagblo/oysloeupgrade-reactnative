import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import PointsSheet from '../../components/PointsSheet';

export default function ReferEarnScreen() {
  const [referralCode] = React.useState('DAN2785');
  const [referredFriends] = React.useState(0);
  const [showPoints, setShowPoints] = React.useState(false);
  const [showLevelSheet, setShowLevelSheet] = React.useState(false);
  const [showRedeemSheet, setShowRedeemSheet] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState('');
  const [equivalent, setEquivalent] = React.useState(0);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const onPressEarn = () => {
    setShowLevelSheet(true);
  };

  const onPressRedeem = () => {
    setShowRedeemSheet(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer and Earn</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.pointsCard} activeOpacity={0.9} onPress={() => setShowPoints(true)}>
          <View style={styles.pointsCardLeft}>
            <Image source={require('../../oysloe-assets/Ad details screen/Points.png')} style={styles.pointsIcon} />
            <Text style={styles.pointsLabel}>Points</Text>
          </View>
          <View style={styles.pointsCardRight}>
            <Text style={styles.pointsValue}>10,000</Text>
            <Text style={styles.pointsEquivalent}>equals $10</Text>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.85} onPress={onPressEarn}>
            <Image source={require('../../oysloe-assets/refer and earn/Earn.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Earn</Text>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={onPressRedeem} activeOpacity={0.85}>
            <Image source={require('../../oysloe-assets/refer and earn/Redeem.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Redeem</Text>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.levelCard} activeOpacity={0.9} onPress={() => setShowLevelSheet(true)}>
          <View style={styles.levelCardContent}>
            <Text style={styles.levelTitle}>Gold (Level)</Text>
            <Text style={styles.levelProgress}>9,000 points to diamond</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: '40%' }]} />
            </View>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Refer Your friends and Earn</Text>
          <Text style={styles.sectionNote}>Pro Partnership status
All Ads stays promoted for a month
Share unlimited number of Ads
Boost your business</Text>

          <View style={styles.referralCard}>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.referralCount}>You've referred {referredFriends} friends.</Text>
        </View>
      </ScrollView>

      <PointsSheet visible={showPoints} onClose={() => setShowPoints(false)} />

      {/* Earn bottom sheet */}
      <View style={[StyleSheet.absoluteFill, { display: showLevelSheet ? 'flex' : 'none' }]} pointerEvents={showLevelSheet ? 'auto' : 'none'}>
        <View style={styles.sheetOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setShowLevelSheet(false)} />
          <View style={styles.earnSheetCard}>
            <View style={styles.sheetHandle} />
            <Text style={styles.earnSheetTitle}>We value friendship</Text>
            <Text style={styles.earnSheetSubtitle}>Follow the steps below and get rewarded</Text>
            
            {/* Steps */}
            <View style={styles.stepsContainer}>
              <View style={styles.stepItem}>
                <View style={styles.stepNumberCircle}>
                  <Text style={styles.stepNumber}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepText}>Share your code</Text>
                  <Image source={require('../../oysloe-assets/refer and earn/copy.png')} style={styles.stepIcon} />
                </View>
              </View>
              
              <View style={styles.stepConnector} />
              
              <View style={styles.stepItem}>
                <View style={styles.stepNumberCircle}>
                  <Text style={styles.stepNumber}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepText}>Your friend adds the code</Text>
                </View>
              </View>
              
              <View style={styles.stepConnector} />
              
              <View style={styles.stepItem}>
                <View style={styles.stepNumberCircle}>
                  <Text style={styles.stepNumber}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepText}>Your friend places an order</Text>
                </View>
              </View>
            </View>

            {/* Rewards Section */}
            <View style={styles.rewardsContainer}>
              <View style={styles.rewardItem}>
                <Image source={require('../../oysloe-assets/refer and earn/Earn.png')} style={styles.rewardIcon} />
                <View style={styles.rewardTextContainer}>
                  <Text style={styles.rewardLabel}>You get</Text>
                  <Text style={styles.rewardValue}>50 Points</Text>
                </View>
              </View>
              
              <View style={styles.rewardItem}>
                <Image source={require('../../oysloe-assets/refer and earn/Redeem.png')} style={styles.rewardIcon} />
                <View style={styles.rewardTextContainer}>
                  <Text style={styles.rewardLabel}>They get</Text>
                  <Text style={styles.rewardValue}>Discount coupon 10% or 10 points</Text>
                </View>
              </View>
            </View>

            {/* Referral Code Input */}
            <View style={styles.referralCodeContainer}>
              <View style={styles.referralCodeBox}>
                <Text style={styles.referralCodeText}>{referralCode}</Text>
              </View>
              <TouchableOpacity style={styles.referralCopyButton} onPress={copyToClipboard}>
                <Text style={styles.referralCopyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Redeem bottom sheet */}
      <View style={[StyleSheet.absoluteFill, { display: showRedeemSheet ? 'flex' : 'none' }]} pointerEvents={showRedeemSheet ? 'auto' : 'none'}>
        <View style={styles.sheetOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowRedeemSheet(false)} />
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.couponCard}>
              <View style={styles.sheetHandle} />
              <View style={styles.couponHeaderRow}>
                <Image source={require('../../oysloe-assets/refer and earn/Redeem.png')} style={styles.couponGiftIcon} />
                <Text style={styles.couponTitle}>Apply coupon</Text>
              </View>
              <View style={styles.couponPanel}>
                <View style={styles.couponTopRow}>
                  <Text style={styles.couponSubtitle}>Get Cash equivalent</Text>
                  <Text style={styles.couponAmount}>¢{equivalent}</Text>
                </View>
                <View style={styles.couponInputRow}>
                  <TextInput style={styles.couponInput} placeholder={'Add code here'} placeholderTextColor={'#9aa3ad'} value={couponCode} onChangeText={(t) => { setCouponCode(t); setEquivalent(t.trim() ? 10 : 0); }} />
                  <TouchableOpacity style={styles.couponApplyBtn} onPress={() => setEquivalent(couponCode.trim() ? 10 : 0)}>
                    <Text style={styles.couponApplyText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 6, paddingBottom: 10 },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { fontSize: 18, marginRight: 6, color: '#6b7280' },
  backText: { fontSize: 14, color: '#6b7280' },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 },
  pointsCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, paddingRight: 44, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 1, position: 'relative' },
  pointsCardLeft: { flexDirection: 'row', alignItems: 'center' },
  pointsIcon: { width: 28, height: 28, marginRight: 12 },
  pointsLabel: { fontSize: 16, color: '#6b7280', fontWeight: '600' },
  pointsCardRight: { alignItems: 'flex-end' },
  pointsValue: { fontSize: 20, fontWeight: '700' },
  pointsEquivalent: { fontSize: 12, color: '#888' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  actionCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 18, alignItems: 'center', marginHorizontal: 6, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1, position: 'relative' },
  actionIcon: { width: 40, height: 40, marginBottom: 8 },
  actionText: { fontSize: 14, fontWeight: '600' },
  levelCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, position: 'relative' },
  levelCardContent: { flex: 1 },
  levelTitle: { fontSize: 16, fontWeight: '600' },
  levelProgress: { fontSize: 12, color: '#9aa3ad', marginBottom: 8 },
  progressBarContainer: { width: '100%', height: 8, backgroundColor: '#eef7ef', borderRadius: 8, overflow: 'hidden' },
  progressBarFill: { height: '100%', width: '40%', backgroundColor: '#16a34a'},
  section: { marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  sectionNote: { color: '#6b7280', marginBottom: 12, lineHeight: 18 },
  referralCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8 },
  referralCode: { flex: 1, fontWeight: '700' },
  copyButton: { marginLeft: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#e6e6e6' },
  copyButtonText: { color: '#374957', fontWeight: '600' },
  referralCount: { marginTop: 10, color: '#6b7280' },
  cardArrow: { position: 'absolute', right: 12, top: 14, fontSize: 18, color: '#98a2b3' },

  sheetOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'flex-end' },
  sheetCard: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 24 },
  sheetHandle: { alignSelf: 'center', width: 60, height: 6, borderRadius: 3, backgroundColor: '#d1d5db', marginBottom: 10 },
  sheetRow: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10 },
  sheetTitle: { fontSize: 16, fontWeight: '600' },
  sheetSub: { fontSize: 12, color: '#9aa3ad', marginTop: 2 },
  sheetBar: { width: '100%', height: 8, backgroundColor: '#eef7ef', borderRadius: 8, marginTop: 8, overflow: 'hidden' },
  sheetFill: { height: '100%', backgroundColor: '#16a34a' },
  sheetHint: { textAlign: 'center', color: '#6b7280', marginTop: 4, marginBottom: 6 },

  couponCard: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 24 },
  couponHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  couponGiftIcon: { width: 20, height: 20, marginRight: 8 },
  couponTitle: { fontSize: 16, fontWeight: '600' },
  couponPanel: { backgroundColor: '#f7f7f7', borderRadius: 12, padding: 12 },
  couponTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  couponSubtitle: { color: '#6b7280' },
  couponAmount: { color: '#000' },
  couponInputRow: { flexDirection: 'row', alignItems: 'center' },
  couponInput: { flex: 1, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginRight: 8, borderWidth: 1, borderColor: '#e6e6e6' },
  couponApplyBtn: { backgroundColor: '#34d399', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  couponApplyText: { color: '#fff', fontWeight: '600' },

  earnSheetCard: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 32, maxHeight: '80%', marginTop: 'auto', shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 10 },
  earnSheetTitle: { fontSize: 18, fontWeight: '700', color: '#374957', marginBottom: 8, textAlign: 'center' },
  earnSheetSubtitle: { fontSize: 14, color: '#9aa3ad', marginBottom: 24, textAlign: 'center' },
  
  stepsContainer: { marginBottom: 24 },
  stepItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stepNumberCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#fff', borderWidth: 2, borderColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  stepNumber: { fontSize: 16, fontWeight: '700', color: '#6b7280' },
  stepContent: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  stepText: { fontSize: 15, color: '#374957', fontWeight: '500' },
  stepIcon: { width: 20, height: 20, marginLeft: 4 },
  stepConnector: { width: 2, height: 20, backgroundColor: '#e0e0e0', marginLeft: 16, marginBottom: 8, marginTop: -4 },
  
  rewardsContainer: { marginBottom: 24 },
  rewardItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  rewardIcon: { width: 24, height: 24, marginRight: 12 },
  rewardTextContainer: { flex: 1 },
  rewardLabel: { fontSize: 14, color: '#6b7280', marginBottom: 4 },
  rewardValue: { fontSize: 16, fontWeight: '700', color: '#374957' },
  
  referralCodeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  referralCodeBox: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 14, marginRight: 12 },
  referralCodeText: { fontSize: 16, fontWeight: '700', color: '#374957', letterSpacing: 1 },
  referralCopyButton: { backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 14, borderWidth: 1, borderColor: '#e6e6e6' },
  referralCopyButtonText: { fontSize: 16, fontWeight: '600', color: '#374957' },
});

