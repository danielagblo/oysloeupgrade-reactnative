import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router } from 'expo-router';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width } = Dimensions.get('window');
const MINT = '#74FFA7';

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState<'chat' | 'support'>('support');
  const [selectedChatId, setSelectedChatId] = useState<number | null>(3);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Mock chat data - in real app this would come from API/state
  const chatData = [
    { id: 1, title: 'iphone 14 pro max', status: 'Closed', message: null },
    { id: 2, title: 'iphone 14 pro max', message: 'is the iphone 15 pro max today...', status: null },
    { id: 3, title: 'iphone 14 pro max', message: 'is the iphone 15 pro max today...', status: null },
    { id: 4, title: 'iphone 14 pro max', message: 'is the iphone 15 pro max today...', status: null },
    { id: 5, title: 'iphone 14 pro max', message: 'is the iphone 15 pro max today...', status: null }
  ];

  // Mock support cases data
  const supportCases = [
    { id: 'S678432-1', date: 'Aug 21, 2025', title: 'Support: S678432', status: 'Active' },
    { id: 'S678432-2', date: 'Aug 21, 2025', title: 'Support: S678432', status: 'Active' },
    { id: 'S678432-3', date: 'Aug 21, 2025', title: 'Support: S678432', status: 'Active' },
    { id: 'S678432-4', date: 'Aug 21, 2025', title: 'Support: S678432', status: 'Closed' }
  ];

  useEffect(() => {
    // Ensure default state when arriving from the tab bar
    setActiveTab('support');
  }, []);

  const isChat = activeTab === 'chat';
  const isSupport = activeTab === 'support';

  const onPressCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    // Placeholder: navigate to case details later
    Alert.alert('Case opened', caseId);
  };

  return (
    _jsx(SafeAreaView, { style: styles.container, children:
      _jsxs(View, { style: styles.content, children: [
        _jsxs(View, { style: styles.header, children: [
          _jsx(TouchableOpacity, { onPress: () => router.back(), style: styles.backBtn, children:
            _jsx(Text, { style: styles.backText, children: "\u2190 Back" })
          }),
          _jsx(Text, { style: styles.headerTitle, children: "Inbox" })] }
        ),
        _jsxs(View, { style: styles.toggleRow, children: [
          _jsxs(TouchableOpacity, { style: [styles.toggleBtn, isChat && styles.toggleBtnActive], onPress: () => setActiveTab('chat'), children: [
            _jsx(Image, { source: require('@/oysloe-assets/inbox/quick chat.png'), style: styles.toggleIcon }),
            _jsxs(View, { children: [
              _jsx(Text, { style: [styles.toggleLabel, isChat && styles.toggleLabelActive], children: "Chat" }),
              _jsx(Text, { style: [styles.toggleSub, isChat && styles.toggleSubActive], children: "9 unread" })] }
            )] }
          ),
          _jsxs(TouchableOpacity, { style: [styles.toggleBtn, isSupport && styles.toggleBtnActive], onPress: () => setActiveTab('support'), children: [
            _jsx(Image, { source: require('@/oysloe-assets/inbox/support.png'), style: styles.toggleIcon }),
            _jsxs(View, { children: [
              _jsx(Text, { style: [styles.toggleLabel, isSupport && styles.toggleLabelActive], children: "Support" }),
              _jsx(Text, { style: [styles.toggleSub, isSupport && styles.toggleSubActive], children: "14 active" })] }
            )] }
          )] }
        ),

        isSupport && _jsx(Text, { style: styles.heading, children: "Get Help Anytime" }),
        isSupport && _jsx(Text, { style: styles.description, children: "If you are facing an issue,send us a report,we will respond to you immediately.Our support is active 24/7." }),

        isSupport && _jsxs(View, { style: styles.addCaseWrapper, children: [
          _jsx(Text, { style: styles.addCaseText, children: "Add case" }),
          _jsx(View, { style: styles.addCasePlus, children:
            _jsx(Text, { style: styles.plusSymbol, children: "+" })
          })] }
        ),

        isSupport && _jsx(Text, { style: styles.sectionLabel, children: "Open Case" }),

        isChat && chatData.length > 0 ? _jsx(ScrollView, { style: styles.chatList, showsVerticalScrollIndicator: false, children:
          chatData.map((chat) =>
          _jsxs(TouchableOpacity, { style: [styles.chatItem, selectedChatId === chat.id && styles.chatItemSelected], onPress: () => setSelectedChatId(chat.id), children: [
            _jsx(Image, { source: require('@/oysloe-assets/Ad images/iphone14.png'), style: styles.chatImage }),
            _jsxs(View, { style: styles.chatContent, children: [
              _jsx(Text, { style: styles.chatTitle, children: chat.title }),
              chat.status ? _jsxs(View, { style: styles.statusBadge, children: [
                _jsx(Text, { style: styles.statusBadgeText, children: chat.status })] }
              ) : chat.message ? _jsx(Text, { style: styles.chatMessage, children: chat.message }) : null] }
            )] }
          )
          ) }
        ) : null,

        isSupport && supportCases.length > 0 ? _jsx(ScrollView, { style: styles.supportList, showsVerticalScrollIndicator: false, children:
          supportCases.map((c) =>
          _jsx(TouchableOpacity, { onPress: () => onPressCase(c.id), children:
            _jsxs(View, { style: styles.supportItem, children: [
              _jsx(Text, { style: styles.supportDate, children: c.date }),
              _jsxs(View, { style: styles.supportRow, children: [
                _jsxs(View, { style: { flex: 1 }, children: [
                  _jsx(Text, { style: styles.supportTitle, children: c.title }),
                  _jsx(View, { style: [styles.caseBadge, c.status === 'Active' ? styles.caseBadgeActive : styles.caseBadgeClosed], children:
                    _jsx(Text, { style: styles.caseBadgeText, children: c.status })
                  })] }
                ),
                selectedCaseId === c.id && _jsx(View, { style: styles.redDot })] }
              )] }
            ) }
          )
          ) }
        ) : null,

        (isChat && chatData.length === 0) || (isSupport && supportCases.length === 0) ? _jsxs(View, { style: styles.emptyState, children: [
          _jsx(Image, { source: require('@/oysloe-assets/Ad details screen/no.png'), style: styles.emptyImage }),
          _jsx(Text, { style: styles.emptyText, children: "No data to show" })] }
        ) : null] }
      ) }
    ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8
  },
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'center'
  },
  backText: {
    fontSize: 14,
    color: '#636060cf'
  },
  headerTitle: {
    fontSize: 18,
    color: '#374957',
    fontWeight: '600'
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 12,
    marginBottom: 16
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (width - 16 * 2 - 10) / 2,
    backgroundColor: '#f5f7f8',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  toggleBtnActive: {
    backgroundColor: MINT
  },
  toggleIcon: {
    width: 22,
    height: 22,
    marginRight: 10
  },
  toggleLabel: {
    fontSize: 14,
    color: '#374957',
    fontWeight: '600'
  },
  toggleLabelActive: {
    color: '#1c2b36'
  },
  toggleSub: {
    fontSize: 10,
    color: '#7d8b96',
    marginTop: Platform.OS === 'ios' ? 2 : 0
  },
  toggleSubActive: {
    color: '#1c2b36'
  },
  heading: {
    fontSize: 20,
    color: '#374957',
    fontWeight: '700',
    marginBottom: 8
  },
  description: {
    fontSize: 11,
    color: '#7d8b96',
    lineHeight: 16,
    marginBottom: 18
  },
  addCaseWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 18
  },
  addCaseText: {
    fontSize: 13,
    color: '#374957',
    marginRight: 10,
    fontWeight: '500'
  },
  addCasePlus: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: MINT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusSymbol: {
    fontSize: 16,
    color: '#0b1a23',
    fontWeight: '700'
  },
  sectionLabel: {
    fontSize: 18,
    color: '#374957',
    fontWeight: '700',
    marginBottom: 12
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 14
  },
  emptyText: {
    fontSize: 12,
    color: '#7d8b96'
  },
  chatList: {
    flex: 1,
    marginTop: 4
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  chatItemSelected: {
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center'
  },
  chatTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374957',
    marginBottom: 4
  },
  chatMessage: {
    fontSize: 13,
    color: '#7d8b96',
    lineHeight: 18
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  statusBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600'
  },
  // Support list styles
  supportList: {
    flex: 1
  },
  supportItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  supportDate: {
    fontSize: 9,
    color: '#7d8b96',
    marginBottom: 4
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  supportTitle: {
    fontSize: 12,
    color: '#374957',
    fontWeight: '700',
    marginBottom: 6
  },
  caseBadge: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2
  },
  caseBadgeActive: {
    backgroundColor: '#32d583'
  },
  caseBadgeClosed: {
    backgroundColor: '#e74c3c'
  },
  caseBadgeText: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '700'
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff5a5a',
    alignSelf: 'flex-start',
    marginTop: 3
  }
});