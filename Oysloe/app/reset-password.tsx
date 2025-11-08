import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ResetPasswordScreen() {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [showPopup, setShowPopup] = useState(false);
  const inputRefs = useRef<any[]>([]);
  const navigatedRef = useRef(false);

  const handleChange = (value: string, index: number) => {
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus?.();
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus?.();
    }
  };

  const isComplete = () => code.every((d) => d !== '');

  const handleSubmit = () => {
    setShowPopup(true);
  };

  const onContinueFromPopup = () => {
    setShowPopup(false);
    goNextIfComplete();
  };

  const goNextIfComplete = () => {
    if (!isComplete()) return;
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    router.push('/reset-password-details' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Text style={styles.backText}>{'\u2039'}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reset Password</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.otpRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={styles.otpBox}
                value={digit}
                onChangeText={(val) => handleChange(val, index)}
                onKeyPress={(e) => handleKeyPress(e.nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
                autoCapitalize="none"
                autoCorrect={false}
              />
            ))}
          </View>

          <Text style={styles.instruction}>Enter the verification code sent to your number</Text>

          <TouchableOpacity style={[styles.submitButton, !isComplete() && styles.submitDisabled]} onPress={handleSubmit} disabled={!isComplete()}>
            <Text style={[styles.submitText, !isComplete() && styles.submitTextDisabled]}>Submit</Text>
          </TouchableOpacity>

          <Text style={styles.helperHeading}>Cant Login?</Text>
          <View style={styles.helpRow}>
            <TouchableOpacity style={styles.helpBtn} onPress={() => router.push('/login')}>
              <Text style={styles.helpBtnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpBtn} onPress={() => router.push('/otp-login')}>
              <Text style={styles.helpBtnText}>OTP Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={showPopup} transparent animationType="fade" onRequestClose={onContinueFromPopup}>
        <View style={styles.modalOverlay}>
          <View style={styles.popup}>
            <View style={styles.circleSuccess}>
              <Text style={styles.tick}>✓</Text>
            </View>
            <Text style={styles.popupTitle}>Success</Text>
            <Text style={styles.popupMsg}>Code verified. Continue to set new password.</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onContinueFromPopup}>
              <Text style={styles.closeBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const BOX = Math.min(55, Math.max(45, width / 8));

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  content: { flexGrow: 1, paddingHorizontal: 30, justifyContent: 'center', paddingVertical: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E8EDF2' },
  backText: { fontSize: 24, color: '#333333', marginTop: -2 },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#333333' },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18, paddingHorizontal: 10 },
  otpBox: {
    width: BOX,
    height: BOX + 8,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    color: '#333333'
  },
  instruction: { fontSize: 14, color: '#333333', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  submitButton: { backgroundColor: '#66FF99', borderRadius: 25, paddingVertical: 18, alignItems: 'center', marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  submitDisabled: { backgroundColor: '#CCCCCC', opacity: 0.6 },
  submitText: { color: '#474444ff', fontSize: 18, fontWeight: '600' },
  submitTextDisabled: { color: '#999999' },
  helperHeading: { fontSize: 16, color: '#333333', textAlign: 'center', marginBottom: 16 },
  helpRow: { flexDirection: 'row', justifyContent: 'space-between' },
  helpBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 25, paddingVertical: 16, paddingHorizontal: 20, flex: 0.48, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  helpBtnText: { color: '#333333', fontSize: 14, fontWeight: '400' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  popup: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 40, paddingHorizontal: 32, alignItems: 'center', minWidth: 320, maxWidth: 380, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 12 },
  circleSuccess: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#66FF99', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  tick: { fontSize: 40, color: '#FFFFFF', fontWeight: 'bold' },
  popupTitle: { fontSize: 20, fontWeight: '700', color: '#333333', marginBottom: 8 },
  popupMsg: { fontSize: 16, color: '#666666', textAlign: 'center', marginBottom: 20, lineHeight: 22, paddingHorizontal: 8 },
  closeBtn: { backgroundColor: '#66FF99', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, minWidth: 120, alignItems: 'center' },
  closeBtnText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' }
});