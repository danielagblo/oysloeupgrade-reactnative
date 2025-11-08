import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

type Message = {
  id: string;
  text: string;
  time: string; // e.g. "12:00"
  from: 'support' | 'you';
  showAvatar?: boolean;
};

export default function ChatConversationScreen() {
  const params = useLocalSearchParams();
  const chatId = params?.chatId ?? 'unknown';
  const messagesYesterday: Message[] = useMemo(() => [
    {
      id: 'm1',
      text: "Hi,can i grab? your product.i need this item to buy",
      time: '12:00',
      from: 'support',
      showAvatar: true
    },
    {
      id: 'm2',
      text: "Hi,can i grab? your product.i need this item to buy",
      time: '12:00',
      from: 'you',
      showAvatar: true
    }
  ], []);

  const messagesToday: Message[] = useMemo(() => [
    {
      id: 'm3',
      text: 'Hi,can i grab?',
      time: '12:00',
      from: 'you',
      showAvatar: true
    }
  ], []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>{'\u2039'}</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>iphone 14 pro max</Text>
          <Text style={styles.headerSub}>Chat • #{chatId}</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <DateChip label="Yesterday" />
        {messagesYesterday.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        <DateChip label="Today" />
        {messagesToday.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </ScrollView>

      <InputBar />
    </SafeAreaView>
  );
}

function DateChip({ label }: { label: string }) {
  return (
    <View style={styles.dateChip}>
      <Text style={styles.dateChipText}>{label}</Text>
    </View>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isYou = message.from === 'you';
  const bubbleStyle = [
    styles.bubble,
    isYou ? styles.bubbleYou : styles.bubbleSupport
  ];

  const rowStyle = [styles.msgRow, isYou ? styles.rowRight : styles.rowLeft];

  const avatarSource = isYou
    ? require('@/oysloe-assets/Ad details screen/you.png')
    : require('@/oysloe-assets/Ad details screen/supportman.png');

  return (
    <View style={rowStyle}>
      {!isYou && message.showAvatar && (
        <View>
          <Text style={{ marginLeft: '8%' }}>Adam</Text>
          <Image source={avatarSource} style={[styles.avatar, styles.avatarLeft]} />
        </View>
      )}

         {isYou && message.showAvatar && (
        <View>
          <Text style={{ marginRight: '8%' }}>You</Text>
          <Image source={avatarSource} style={[styles.avatar, styles.avatarRight]} />
        </View>
      )}
         <View style={bubbleStyle}>
        <Text style={[styles.messageText, isYou && styles.messageTextYou]}>{message.text}</Text>
      </View>



      <Text style={[styles.timeText, isYou ? styles.timeRight : styles.timeLeft]}>{message.time}</Text>
    </View>
  );
}

function InputBar() {
  return (
    <View style={[styles.inputWrap]}>
      <View style={styles.inputBox}>
        <TouchableOpacity style={styles.iconBtn}>
          <Image source={require('@/oysloe-assets/Ad details screen/imageupload.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.composePlaceholder}>
          <Text style={styles.composeText}>Type a message</Text>
        </View>
        <TouchableOpacity style={styles.sendBtn}>
          <Image source={require('@/oysloe-assets/Ad details screen/send.png')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.micPill}>
        <Image source={require('@/oysloe-assets/Ad details screen/Microphone.png')} style={styles.micIcon} />
      </TouchableOpacity>
    </View>
  );
}

const BUBBLE_MAX_WIDTH = width * 0.72;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 6,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF2'
  },
  backBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#F0F2F4'
  },
  backText: {
    fontSize: 18,
    color: '#333'
  },
  headerTitle: {
    fontSize: 14,
    color: '#51565C'
  },
  headerSub: {
    fontSize: 12,
    color: '#98A1AA'
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 20
  },
  dateChip: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E8EDF2'
  },
  dateChipText: {
    fontSize: 11,
    color: '#8E959C'
  },
  msgRow: {
    marginBottom: 26,
    position: 'relative'
  },
  rowLeft: {
    alignItems: 'flex-start'
  },
  rowRight: {
    alignItems: 'flex-end'
  },
  bubble: {
    maxWidth: BUBBLE_MAX_WIDTH,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14
  },
  bubbleSupport: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8EDF2',
    borderTopLeftRadius: 6
  },
  bubbleYou: {
    backgroundColor: '#D8F6E2',
    borderTopRightRadius: 6
  },
  messageText: {
    fontSize: 13,
    color: '#47505A'
  },
  messageTextYou: {
    color: '#334149'
  },
  avatar: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    zIndex: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  avatarLeft: {
    left: -12,
    top: -10
  },
  avatarRight: {
    right: -12,
    top: -10
  },
  timeText: {
    marginTop: 6,
    fontSize: 10,
    color: '#98A1AA'
  },
  timeLeft: {
    alignSelf: 'flex-start',
    marginLeft: 6
  },
  timeRight: {
    alignSelf: 'flex-end',
    marginRight: 6
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: '#F6F7F8',
    position:'absolute',bottom:0, width:'100%',
  },
  inputBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EDF2',
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 18,
    height: 18
  },
  composePlaceholder: {
    flex: 1,
    paddingHorizontal: 8
  },
  composeText: {
    fontSize: 13,
    color: '#9AA3AD'
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendIcon: {
    width: 18,
    height: 18
  },
  micPill: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8EDF2'
  },
  micIcon: {
    width: 25,
    height: 25,
    objectFit: 'contain'
  }
});




