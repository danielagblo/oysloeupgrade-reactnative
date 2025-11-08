import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, StatusBar, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { Image } from 'expo-image';

import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function OTPLoginScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showResendPopup, setShowResendPopup] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<any[]>([]);

  const handleResend = () => {
    console.log('Resend OTP');
    setShowResendPopup(true);

  };

  const handleCloseResendPopup = () => {
    setShowResendPopup(false);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);


    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus?.();
    }
  };

  const isOtpComplete = () => {
    return otp.every((digit) => digit !== '');
  };

  const handlePasswordReset = () => {
    setShowResetPopup(true);
  };

  const closeResetPopup = () => {
    setShowResetPopup(false);
    router.push('/reset-password');
  };

  const handleLogin = () => {
    router.back();
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>OTP Login</Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                  style={styles.otpBox}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e.nativeEvent.key, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              ))}
            </View>

            <Text style={styles.instructionText}>
              We'll send a verification code to the number if it's being in our system
            </Text>

            <TouchableOpacity
              style={[styles.resendButton, !isOtpComplete() && styles.resendButtonDisabled]}
              onPress={handleResend}
              disabled={!isOtpComplete()}
            >
              <Text style={[styles.resendButtonText, !isOtpComplete() && styles.resendButtonTextDisabled]}>
                Resend
              </Text>
            </TouchableOpacity>

            <Text style={styles.cantLoginText}>Cant Login?</Text>

            <View style={styles.helpButtonsContainer}>
              <TouchableOpacity style={styles.helpButton} onPress={handlePasswordReset}>
                <Text style={styles.helpButtonText}>Password Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.helpButton} onPress={handleLogin}>
                <Text style={styles.helpButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account ? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <Modal visible={showResendPopup} transparent animationType="fade" onRequestClose={handleCloseResendPopup}>
        <View style={styles.modalOverlay}>
          <View style={styles.popupContainer}>
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>✓</Text>
            </View>

            <Text style={styles.popupTitle}>OTP Resent Successfully!</Text>
            <Text style={styles.popupMessage}>
              A new verification code has been sent to your registered phone number.
            </Text>

            <TouchableOpacity style={styles.closeButton} onPress={handleCloseResendPopup}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showResetPopup} transparent animationType="fade" onRequestClose={closeResetPopup}>
        <View style={styles.modalOverlay}>
          <View style={styles.popupContainer}>
            <View style={styles.successIconContainer}>
              <Image source={require('@/oysloe-assets/bottom menu/alert.png')} style={styles.promptIcon} contentFit="contain" />
            </View>
            <Text style={styles.popupTitle}>Check your messages</Text>
            <Text style={styles.popupMessage}>We\u2019ve sent a reset code via SMS. Open your Messages app to continue.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeResetPopup}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  keyboardAvoidingView: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    paddingVertical: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 40
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center'
  },
  instructionText: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20
  },
  resendButton: {
    backgroundColor: '#66FF99',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  resendButtonText: {
    color: '#474444ff',
    fontSize: 18,
    fontWeight: '600'
  },
  resendButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6
  },
  resendButtonTextDisabled: {
    color: '#999999'
  },
  cantLoginText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16
  },
  helpButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40
  },
  helpButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flex: 0.48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  helpButtonText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '400'
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpText: {
    fontSize: 16,
    color: '#333333'
  },
  signUpLink: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600'
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  popupContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
    minWidth: 320,
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#66FF99',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#66FF99',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  successIcon: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  popupTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16
  },
  popupMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 10
  },
  closeButton: {
    backgroundColor: '#66FF99',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  promptIcon: { width: 28, height: 28, tintColor: '#FFFFFF' }
});