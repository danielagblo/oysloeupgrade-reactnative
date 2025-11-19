import React, { useMemo, useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert, Animated } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useAudioRecorder, RecordingPresets, setAudioModeAsync } from 'expo-audio';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const vw = (percent: number) => (width * percent) / 100;
const vh = (percent: number) => (height * percent) / 100;

type Message = {
  id: string;
  text: string;
  time: string;
  from: 'support' | 'you';
  showAvatar?: boolean;
  audio?: {
    uri: string;
    duration: number;
  };
  image?: string;
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ensureFileReady = async (uri: string, retries = 15): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      const info = await FileSystem.getInfoAsync(uri);
      if (info.exists && (info.size ?? 0) > 0) {
        return true;
      }
    } catch (err) {
      console.warn('File check failed', err);
    }
    await wait(150);
  }
  return false;
};

export default function ChatConversationScreen() {
  const params = useLocalSearchParams();
  const chatId = params?.chatId ?? 'unknown';
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

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
    },
    ...messages
  ], [messages]);

  const sendMessage = () => {
    if (!messageText.trim() && !selectedImage) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageText.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      from: 'you',
      showAvatar: true,
      image: selectedImage ?? undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText('');
    setSelectedImage(null);

    // Scroll to bottom after sending
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scroll} 
          contentContainerStyle={styles.scrollContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <DateChip label="Yesterday" />
          {messagesYesterday.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}

          <DateChip label="Today" />
          {messagesToday.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
        </ScrollView>

        <InputBar 
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          messageText={messageText}
          setMessageText={setMessageText}
          onSend={sendMessage}
          messages={messages}
          setMessages={setMessages}
          scrollViewRef={scrollViewRef}
        />
      </KeyboardAvoidingView>
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

  const hasImage = Boolean(message.image);
  const hasAudio = Boolean(message.audio);
  const hasText = Boolean(message.text?.trim().length);

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
        {hasImage && (
          <Image source={{ uri: message.image! }} style={styles.messageImage} />
        )}
        {hasAudio && <VoiceMessageBubble audio={message.audio!} isYou={isYou} />}
        {hasText && (
          <Text
            style={[
              styles.messageText,
              isYou && styles.messageTextYou,
              (hasImage || hasAudio) && styles.messageTextWithMedia,
            ]}
          >
            {message.text}
          </Text>
        )}
      </View>



      <Text style={[styles.timeText, isYou ? styles.timeRight : styles.timeLeft]}>{message.time}</Text>
    </View>
  );
}

type VoiceMessageBubbleProps = {
  audio: NonNullable<Message['audio']>;
  isYou: boolean;
};

function VoiceMessageBubble({ audio, isYou }: VoiceMessageBubbleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  const togglePlayback = async () => {
    try {
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: audio.uri },
          { shouldPlay: false }
        );
        soundRef.current = sound;
        sound.setOnPlaybackStatusUpdate((status: Audio.AVPlaybackStatus) => {
          if ('isLoaded' in status && status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      }

      const sound = soundRef.current;
      if (!sound) return;

      const status = await sound.getStatusAsync();
      if ('isLoaded' in status && status.isLoaded) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error('Audio playback error', err);
      Alert.alert('Playback error', 'Unable to play this voice note.');
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.voiceMessageContainer}>
      <TouchableOpacity
        style={[styles.voicePlayButton, isYou && styles.voicePlayButtonYou]}
        onPress={togglePlayback}
        activeOpacity={0.8}
      >
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={16} color="#fff" />
      </TouchableOpacity>
      <View style={styles.voiceWaveform}>
        <View style={styles.voiceWaveDots}>
          {[...Array(12)].map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.voiceDot,
                { height: 6 + ((idx % 4) + 1) * 4 },
              ]}
            />
          ))}
        </View>
        <Text style={[styles.voiceDuration, isYou && styles.voiceDurationYou]}>
          {formatDuration(audio.duration)}
        </Text>
      </View>
    </View>
  );
}

type InputBarProps = {
  selectedImage: string | null;
  setSelectedImage: (uri: string | null) => void;
  messageText: string;
  setMessageText: (text: string) => void;
  onSend: () => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  scrollViewRef: React.RefObject<ScrollView | null>;
};

function InputBar({ selectedImage, setSelectedImage, messageText, setMessageText, onSend, messages, setMessages, scrollViewRef }: InputBarProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isRecordingReady, setIsRecordingReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const waveAnimation = useRef(new Animated.Value(0)).current;
  const recordingLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const isMountedRef = useRef(true);

  const prepareRecordingPreview = async (uri: string) => {
    setIsRecordingReady(false);
    const ready = await ensureFileReady(uri);
    if (!isMountedRef.current) return;
    if (ready) {
      setIsRecordingReady(true);
    } else {
      Alert.alert('Recording unavailable', 'Unable to prepare that voice note. Please try again.');
      setRecordingUri(null);
      setIsRecordingReady(false);
    }
  };

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Initialize audio mode for iOS on mount using expo-audio API
  useEffect(() => {
    const setupAudio = async () => {
      try {
        // Use expo-audio's setAudioModeAsync to enable recording on iOS
        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });
        console.log('Audio mode configured for recording on mount');
      } catch (err) {
        console.error('Failed to configure audio mode', err);
      }
    };
    setupAudio();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRecorder.isRecording) {
        audioRecorder.stop();
      }
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Animate recording waves
  useEffect(() => {
    if (isRecording) {
      recordingLoopRef.current?.stop();
      recordingLoopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      recordingLoopRef.current.start();
    } else {
      recordingLoopRef.current?.stop();
      waveAnimation.setValue(0);
    }
  }, [isRecording, waveAnimation]);

  // Update recording duration
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
    // Don't reset duration when stopping - keep it for preview
    return () => clearInterval(interval);
  }, [isRecording]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const startRecording = async () => {
    try {
      console.log('Preparing audio for recording...');
      // Ensure audio mode allows recording before starting
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
      console.log('Audio mode configured successfully');

      console.log('Starting recording..');
      setRecordingUri(null);
      setRecordingDuration(0);
      setIsRecordingReady(false);
      await audioRecorder.record();
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording. Please grant microphone permission.');
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!isRecording) {
      return;
    }

    console.log('stopRecording called');
    console.log('Stopping recording..');
    
    try {
      const result = await audioRecorder.stop();
      console.log('Recording stopped');

      let uri: string | null = null;
      if (result) {
        const maybeRecording = (result as any).recording;
        if (maybeRecording?.getURI) {
          uri = maybeRecording.getURI();
        } else if (maybeRecording?.uri) {
          uri = maybeRecording.uri;
        }
        if (!uri && (result as any).uri) {
          uri = (result as any).uri;
        }
        if (!uri && (result as any).recordingOptions?.android?.extension) {
          uri = audioRecorder.getURI?.() ?? null;
        }
        const durationMs = (result as any).durationMs ?? (result as any).durationMillis;
        if (durationMs) {
          setRecordingDuration(Math.max(1, Math.round(durationMs / 1000)));
        }
      }

      if (!uri && audioRecorder.getURI) {
        uri = audioRecorder.getURI();
      }
      if (!uri && audioRecorder.uri) {
        uri = audioRecorder.uri;
      }

      if (uri) {
        console.log('Recording stored at', uri);
        setRecordingUri(uri);
        prepareRecordingPreview(uri);
        if (sound) {
          await sound.unloadAsync();
          setSound(null);
        }
      } else {
        console.warn('Recording has no URI, skipping preview setup');
      }
      
      setIsRecording(false);
    } catch (err) {
      console.error('Failed to stop recording', err);
      setIsRecording(false);
    }
  };

  const playRecording = async () => {
    if (!recordingUri) return;
    if (!isRecordingReady) {
      Alert.alert('Please wait', 'Voice note is still processing.');
      return;
    }
    try {
      let playbackSound = sound;
      if (!playbackSound) {
        const created = await Audio.Sound.createAsync(
          { uri: recordingUri },
          { shouldPlay: false }
        );
        playbackSound = created.sound;
        setSound(playbackSound);
        playbackSound.setOnPlaybackStatusUpdate((status: Audio.AVPlaybackStatus) => {
          if ('isLoaded' in status && status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      }

      const status = await playbackSound.getStatusAsync();
      if ('isLoaded' in status && status.isLoaded) {
        if (isPlaying) {
          await playbackSound.pauseAsync();
          setIsPlaying(false);
        } else {
          await playbackSound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error('Failed to play recording', err);
      Alert.alert('Error', 'Failed to play recording');
    }
  };

  const deleteRecording = async () => {
    if (sound) {
      try {
        if (isPlaying) {
          await sound.stopAsync();
        }
        await sound.unloadAsync();
      } catch (err) {
        console.warn('Failed to unload preview sound', err);
      }
      setSound(null);
    }
    setIsPlaying(false);
    setRecordingUri(null);
    setRecordingDuration(0); // Reset duration
    setIsRecordingReady(false);
  };

  const sendRecording = async () => {
    if (!recordingUri) return;
    if (!isRecordingReady) {
      Alert.alert('Please wait', 'Voice note is still processing.');
      return;
    }
    if (recordingUri) {
      const newMessage: Message = {
        id: `m${Date.now()}`,
        text: '',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        from: 'you',
        showAvatar: true,
        audio: {
          uri: recordingUri,
          duration: recordingDuration,
        },
      };

      setMessages((prev) => [...prev, newMessage]);
      console.log('Sending voice note:', recordingUri);

      await deleteRecording();
      setRecordingDuration(0);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleMicrophonePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.chatInputContainer}>
      {selectedImage && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.removeImageBtn} onPress={removeImage}>
            <Text style={styles.removeImageText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Recording Preview - WhatsApp style */}
      {recordingUri && !isRecording && (
        <View style={styles.recordingPreview}>
          <TouchableOpacity
            style={[styles.playBtn, !isRecordingReady && styles.playBtnDisabled]}
            onPress={playRecording}
            disabled={!isRecordingReady}
          >
            <Ionicons 
              name={isPlaying ? 'pause' : 'play'} 
              size={20} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
          <View style={styles.waveformPlaceholder}>
            <Text style={styles.recordingLabel}>
              {isRecordingReady
                ? `🎤 Voice Note • ${formatDuration(recordingDuration)} • ${isPlaying ? 'Pause' : 'Play'}`
                : 'Preparing voice note...'}
            </Text>
          </View>
          <TouchableOpacity style={styles.deleteBtn} onPress={deleteRecording}>
            <Ionicons name="close-circle" size={28} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendRecordingBtn, !isRecordingReady && styles.sendRecordingBtnDisabled]}
            onPress={sendRecording}
            disabled={!isRecordingReady}
          >
            <Ionicons name="send" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Recording in progress */}
      {isRecording && (
        <View style={styles.recordingContainer}>
          <View style={styles.recordingInProgress}>
            <View style={styles.recordingWaves}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.wave,
                    {
                      transform: [{
                        scaleY: waveAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.3, 1.5 + (i * 0.2)],
                        }),
                      }],
                      opacity: waveAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ]}
                />
              ))}
            </View>
            <Text style={styles.recordingTime}>{formatDuration(recordingDuration)}</Text>
            <Text style={styles.recordingHint}>Tap the mic to stop</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.microphoneBtn, styles.microphoneBtnRecording]}
            onPress={handleMicrophonePress}
            activeOpacity={0.8}
          >
            <Image 
              source={require('@/oysloe-assets/Ad details screen/Microphone.png')} 
              style={[styles.microphoneIcon, styles.microphoneIconRecording]} 
            />
          </TouchableOpacity>
        </View>
      )}
      
      {!isRecording && !recordingUri && (
        <View style={styles.chatInputRow}>
          <View style={styles.chatInputWrapper}>
            <TouchableOpacity style={styles.iconBtn} onPress={pickImage}>
              <Image source={require('@/oysloe-assets/Ad details screen/imageupload.png')} style={styles.icon} />
            </TouchableOpacity>
            <TextInput
              style={styles.composeInput}
              placeholder="Type a message"
              placeholderTextColor="#9CA3AF"
              value={messageText}
              onChangeText={setMessageText}
              multiline
            />
            <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
              <Image source={require('@/oysloe-assets/Ad details screen/send.png')} style={styles.sendIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.microphoneBtn, isRecording && styles.microphoneBtnRecording]}
            onPress={handleMicrophonePress}
            activeOpacity={0.8}
          >
            <Image 
              source={require('@/oysloe-assets/Ad details screen/Microphone.png')} 
              style={[styles.microphoneIcon, isRecording && styles.microphoneIconRecording]} 
            />
          </TouchableOpacity>
        </View>
      )}
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
  messageTextWithMedia: {
    marginTop: 8,
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
  chatInputContainer: {
    backgroundColor: '#F6F7F8',
    paddingTop: vh(1),
    paddingBottom: vh(1)
  },
  imagePreviewContainer: {
    position: 'relative',
    marginHorizontal: vw(3),
    marginBottom: vh(1),
    alignSelf: 'flex-start',
    borderRadius: 12,
    overflow: 'hidden'
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 12
  },
  removeImageBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  removeImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3),
    gap: vw(2),
    backgroundColor: '#F6F7F8'
  },
  chatInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: vw(8),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: vw(3),
    paddingVertical: vh(1),
    marginRight: vw(2)
  },
  iconBtn: {
    width: vw(9),
    height: vw(9),
    borderRadius: vw(4.5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: vw(4.5),
    height: vw(4.5),
    resizeMode: 'contain'
  },
  composeInput: {
    flex: 1,
    paddingHorizontal: vw(2),
    fontSize: vw(3.2),
    color: '#334149',
    maxHeight: 100,
    paddingVertical: vh(1)
  },
  sendBtn: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendIcon: {
    width: vw(4.5),
    height: vw(4.5),
    resizeMode: 'contain'
  },
  microphoneBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: vw(8),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: vw(3),
    justifyContent: 'center',
    alignItems: 'center'
  },
  microphoneBtnRecording: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF5252'
  },
  microphoneIcon: {
    width: vw(5),
    height: vw(5),
    resizeMode: 'contain'
  },
  microphoneIconRecording: {
    tintColor: '#FFFFFF'
  },
  voiceMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    maxWidth: BUBBLE_MAX_WIDTH - 20,
  },
  voicePlayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  voicePlayButtonYou: {
    backgroundColor: '#FFFFFF33',
  },
  voiceWaveform: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  voiceWaveDots: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 8,
  },
  voiceDot: {
    width: 3,
    borderRadius: 2,
    backgroundColor: '#94A3B8',
  },
  voiceDuration: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '600',
  },
  voiceDurationYou: {
    color: '#F9FAFB',
  },
  recordingInProgress: {
    paddingHorizontal: vw(5),
    paddingVertical: vh(2),
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    flex: 1,
    alignItems: 'center'
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3),
    gap: vw(2),
    backgroundColor: '#F6F7F8'
  },
  recordingWaves: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    gap: 4,
    marginBottom: 12
  },
  wave: {
    width: 4,
    height: 20,
    backgroundColor: '#FF6B6B',
    borderRadius: 2
  },
  recordingTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 4
  },
  recordingHint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center'
  },
  recordingPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    paddingHorizontal: vw(3),
    paddingVertical: vh(1.5),
    marginHorizontal: vw(3),
    marginBottom: vh(1),
    gap: 12
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playBtnDisabled: {
    opacity: 0.5
  },
  waveformPlaceholder: {
    flex: 1,
    height: 40,
    justifyContent: 'center'
  },
  recordingLabel: {
    fontSize: 14,
    color: '#374957',
    fontWeight: '500'
  },
  deleteBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendRecordingBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendRecordingBtnDisabled: {
    opacity: 0.5
  },
  messageImage: {
    width: vw(40),
    height: vw(40),
    borderRadius: 12,
    marginBottom: 6,
    alignSelf: 'stretch',
    backgroundColor: '#E5E7EB'
  },
});




