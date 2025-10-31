import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert } from
'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ReferEarnScreen() {
  const [referralCode] = React.useState('DAN2785');
  const [referredFriends] = React.useState(0);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  return (
    _jsxs(SafeAreaView, { style: styles.container, children: [

      _jsxs(View, { style: styles.header, children: [
        _jsxs(TouchableOpacity, { style: styles.backButton, onPress: () => router.back(), children: [
          _jsx(Text, { style: styles.backIcon, children: "\u2190" }),
          _jsx(Text, { style: styles.backText, children: "Back" })] }
        ),
        _jsx(Text, { style: styles.headerTitle, children: "Earn" }),
        _jsx(View, { style: { width: 60 } })] }
      ),

      _jsxs(ScrollView, {
        style: styles.scrollView,
        contentContainerStyle: styles.content,
        showsVerticalScrollIndicator: false, children: [


        _jsxs(TouchableOpacity, { style: styles.pointsCard, activeOpacity: 0.8, children: [
          _jsxs(View, { style: styles.pointsCardLeft, children: [
            _jsx(Image, {
              source: require('@/oysloe-assets/Ad details screen/Points.png'),
              style: styles.pointsIcon }
            ),
            _jsx(Text, { style: styles.pointsLabel, children: "Points" })] }
          ),
          _jsxs(View, { style: styles.pointsCardRight, children: [
            _jsx(Text, { style: styles.pointsValue, children: "10,000" }),
            _jsx(Text, { style: styles.pointsEquivalent, children: "equals \xA210" })] }
          ),
          _jsx(Text, { style: styles.arrowIcon, children: "\u2192" })] }
        ),


        _jsxs(View, { style: styles.actionCardsContainer, children: [
          _jsxs(TouchableOpacity, { style: styles.actionCard, activeOpacity: 0.8, children: [
            _jsx(Image, {
              source: require('@/oysloe-assets/refer and earn/Earn.png'),
              style: styles.actionIcon }
            ),
            _jsx(Text, { style: styles.actionText, children: "Earn" }),
            _jsx(Text, { style: styles.cardArrow, children: "\u2192" })] }
          ),

          _jsxs(TouchableOpacity, { style: [styles.actionCard, { marginRight: 0, marginLeft: 6 }], activeOpacity: 0.8, children: [
            _jsx(Image, {
              source: require('@/oysloe-assets/refer and earn/Redeem.png'),
              style: styles.actionIcon }
            ),
            _jsx(Text, { style: styles.actionText, children: "Redeem" }),
            _jsx(Text, { style: styles.cardArrow, children: "\u2192" })] }
          )] }
        ),


        _jsxs(TouchableOpacity, { style: styles.levelCard, activeOpacity: 0.8, children: [
          _jsxs(View, { style: styles.levelCardContent, children: [
            _jsx(Text, { style: styles.levelTitle, children: "Gold (Level)" }),
            _jsx(Text, { style: styles.levelProgress, children: "9,000 points to diamond" }),
            _jsx(View, { style: styles.progressBarContainer, children:
              _jsx(View, { style: styles.progressBarFill }) }
            )] }
          ),
          _jsx(Text, { style: styles.cardArrow, children: "\u2192" })] }
        ),


        _jsxs(View, { style: styles.referralSection, children: [
          _jsx(Text, { style: styles.referralHeading, children: "Refer Your friends and Earn" }),

          _jsxs(View, { style: styles.benefitsList, children: [
            _jsxs(View, { style: styles.benefitItem, children: [
              _jsx(Text, { style: styles.checkmark, children: "\u2713" }),
              _jsx(Text, { style: styles.benefitText, children: "Pro Partnership status" })] }
            ),
            _jsxs(View, { style: styles.benefitItem, children: [
              _jsx(Text, { style: styles.checkmark, children: "\u2713" }),
              _jsx(Text, { style: styles.benefitText, children: "All Ads stays promoted for a month" })] }
            ),
            _jsxs(View, { style: styles.benefitItem, children: [
              _jsx(Text, { style: styles.checkmark, children: "\u2713" }),
              _jsx(Text, { style: styles.benefitText, children: "Share unlimited number of Ads" })] }
            ),
            _jsxs(View, { style: styles.benefitItem, children: [
              _jsx(Text, { style: styles.checkmark, children: "\u2713" }),
              _jsx(Text, { style: styles.benefitText, children: "Boost your business" })] }
            )] }
          ),


          _jsxs(View, { style: styles.referralCodeContainer, children: [
            _jsx(TextInput, {
              style: styles.referralCodeInput,
              value: referralCode,
              editable: false }
            ),
            _jsx(TouchableOpacity, { style: styles.copyButton, onPress: copyToClipboard, children:
              _jsx(Text, { style: styles.copyButtonText, children: "Copy" }) }
            )] }
          ),

          _jsxs(Text, { style: styles.referralCount, children: ["You've referred ", referredFriends, " friends."] })] }
        )] }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    fontSize: 18,
    color: '#666',
    marginRight: 4
  },
  backText: {
    fontSize: 14,
    color: '#666'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  scrollView: {
    flex: 1
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100
  },
  pointsCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pointsCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  pointsIcon: {
    width: 24,
    height: 24,
    marginRight: 8
  },
  pointsLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500'
  },
  pointsCardRight: {
    alignItems: 'flex-end',
    marginRight: 12
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  pointsEquivalent: {
    fontSize: 12,
    color: '#999',
    marginTop: 2
  },
  arrowIcon: {
    fontSize: 18,
    color: '#999'
  },
  actionCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 100,
    marginRight: 6
  },
  actionIcon: {
    width: 40,
    height: 40,
    marginBottom: 8
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  cardArrow: {
    position: 'absolute',
    right: 12,
    top: 12,
    fontSize: 16,
    color: '#999'
  },
  levelCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  levelCardContent: {
    flex: 1
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6
  },
  levelProgress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    width: '30%',
    backgroundColor: '#66FF99',
    borderRadius: 4
  },
  referralSection: {
    marginBottom: 16
  },
  referralHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16
  },
  benefitsList: {
    marginBottom: 20
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  checkmark: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 10,
    fontWeight: 'bold'
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
    flex: 1
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  referralCodeInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  copyButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginLeft: 8
  },
  copyButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  referralCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 4
  }
});