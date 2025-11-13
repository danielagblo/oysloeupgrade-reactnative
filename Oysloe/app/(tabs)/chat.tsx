import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const MINT = '#74FFA7';

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState<'chat' | 'support'>('support');
  const [selectedChatId, setSelectedChatId] = useState<number | null>(3);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Mock chat data - in real app this would come from API/state
  const chatData = [
    { id: 1, title: 'iphone 14 pro max', status: 'Closed', message: null, from: 'support' as const },
    { id: 2, title: 'iphone 14 pro max', message: 'is the iphone 15 pro max today...', status: null, from: 'you' as const },
    { id: 3, title: 'iphone 14 pro max', message: 'is the iphone 15 pro max today...', status: null, from: 'you' as const },
    { id: 4, title: 'iphone 14 pro max', message: 'is the iphone 15 pro max today...', status: null, from: 'you' as const },
    { id: 5, title: 'iphone 14 pro max', message: 'is the iphone 15 pro max today...', status: null, from: 'support' as const }
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Inbox</Text>
        </View>

        <View style={styles.toggleRow}>
          <TouchableOpacity style={[styles.toggleBtn, isChat && styles.toggleBtnActive]} onPress={() => setActiveTab('chat')}>
            <Image source={require('@/oysloe-assets/inbox/quick chat.png')} style={styles.toggleIcon} />
            <View>
              <Text style={[styles.toggleLabel, isChat && styles.toggleLabelActive]}>Chat</Text>
              <Text style={[styles.toggleSub, isChat && styles.toggleSubActive]}>9 unread</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.toggleBtn, isSupport && styles.toggleBtnActive]} onPress={() => setActiveTab('support')}>
            <Image source={require('@/oysloe-assets/inbox/support.png')} style={styles.toggleIcon} />
            <View>
              <Text style={[styles.toggleLabel, isSupport && styles.toggleLabelActive]}>Support</Text>
              <Text style={[styles.toggleSub, isSupport && styles.toggleSubActive]}>14 active</Text>
            </View>
          </TouchableOpacity>
        </View>

        {isSupport && <Text style={styles.heading}>Get Help Anytime</Text>}
        {isSupport && <Text style={styles.description}>If you are facing an issue,send us a report,we will respond to you immediately.Our support is active 24/7.</Text>}

        {isSupport && (
          <TouchableOpacity style={styles.addCaseWrapper} onPress={() => router.push('/(tabs)/chat-conversation')}>
            <Text style={styles.addCaseText}>Add case</Text>
            <View style={styles.addCasePlus}>
              <Text style={styles.plusSymbol}>+</Text>
            </View>
          </TouchableOpacity>
        )}

        {isSupport && <Text style={styles.sectionLabel}>Open Case</Text>}

        {isChat && chatData.length > 0 ? (
          <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
            {chatData.map((chat) => (
              <TouchableOpacity
                key={chat.id}
                style={[styles.chatItem, selectedChatId === chat.id && styles.chatItemSelected]}
                onPress={() => router.push({ pathname: '/(tabs)/chat-conversation', params: { chatId: String(chat.id) } })}
              >
                <Image source={require('@/oysloe-assets/Ad images/iphone14.png')} style={styles.chatImage} />
                <View style={styles.chatContent}>
                  <View>
                    <Text style={chat.from === 'support' ? styles.fromLabelSupport : styles.fromLabelYou}>{chat.from === 'support' ? 'Support' : 'You'}</Text>
                  </View>
                  <Text style={styles.chatTitle}>{chat.title}</Text>
                  {chat.status ? (
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusBadgeText}>{chat.status}</Text>
                    </View>
                  ) : chat.message ? (
                    <Text style={styles.chatMessage}>{chat.message}</Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View />
        )}

        {isSupport && supportCases.length > 0 ? (
          <ScrollView style={styles.supportList} showsVerticalScrollIndicator={false}>
            {supportCases.map((c) => (
              <TouchableOpacity key={c.id} onPress={() => onPressCase(c.id)}>
                <View style={styles.supportItem}>
                  <Text style={styles.supportDate}>{c.date}</Text>
                  <View style={styles.supportRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.supportTitle}>{c.title}</Text>
                      <View style={[styles.caseBadge, c.status === 'Active' ? styles.caseBadgeActive : styles.caseBadgeClosed]}>
                        <Text style={styles.caseBadgeText}>{c.status}</Text>
                      </View>
                    </View>
                    {selectedCaseId === c.id && <View style={styles.redDot} />}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : null}

        {isChat && chatData.length === 0 ? (
          <View style={styles.chatEmptyState}>
            <Image
              source={require('@/oysloe-assets/Ad details screen/no-data.png')}
              style={styles.chatEmptyImage}
            />
            <Text style={styles.emptyText}>No chats yet</Text>
          </View>
        ) : null}

        {isSupport && supportCases.length === 0 ? (
          <View style={styles.supportEmptyState}>
            <Image
              source={require('@/oysloe-assets/Ad details screen/no-data.png')}
              style={styles.supportEmptyImage}
            />
            <Text style={styles.emptyText}>No open support cases</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
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
  emptyText: {
    fontSize: 12,
    color: '#7d8b96'
  },
  chatEmptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  chatEmptyImage: {
    width: width * 0.8,
    height: width * 0.8,
    maxWidth: 320,
    maxHeight: 320,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  supportEmptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  supportEmptyImage: {
    width: width * 0.8,
    height: width * 0.8,
    maxWidth: 320,
    maxHeight: 320,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  chatList: {
    flex: 1,
    marginTop: 4
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginRight: 12,
    marginTop: -2
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
  fromLabelSupport: { fontSize: 10, color: '#75828d', marginBottom: 2 },
  fromLabelYou: { fontSize: 10, color: '#75828d', alignSelf: 'flex-end', marginBottom: 2 },
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