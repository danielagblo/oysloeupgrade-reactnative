import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, StatusBar, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

const { width } = Dimensions.get('window');

export default function OTPLoginScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showResendPopup, setShowResendPopup] = useState(false);
  const inputRefs = useRef([]);

  const handleResend = () => {
    console.log('Resend OTP');
    setShowResendPopup(true);

  };

  const handleCloseResendPopup = () => {
    setShowResendPopup(false);
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);


    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key, index) => {

    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = () => {
    return otp.every((digit) => digit !== '');
  };

  const handlePasswordReset = () => {
    router.push('/reset-password');
  };

  const handleLogin = () => {
    router.back();
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    _jsxs(_Fragment, { children: [
      _jsx(Stack.Screen, { options: { headerShown: false } }),
      _jsx(StatusBar, { hidden: true }),
      _jsx(SafeAreaView, { style: styles.container, children:
        _jsx(KeyboardAvoidingView, {
          style: styles.keyboardAvoidingView,
          behavior: Platform.OS === 'ios' ? 'padding' : 'height',
          keyboardVerticalOffset: Platform.OS === 'ios' ? 0 : 20, children:

          _jsxs(ScrollView, {
            style: styles.scrollView,
            contentContainerStyle: styles.scrollContent,
            keyboardShouldPersistTaps: "handled",
            showsVerticalScrollIndicator: false, children: [


            _jsx(Text, { style: styles.title, children: "OTP Login" }),


            _jsx(View, { style: styles.otpContainer, children:
              otp.map((digit, index) =>
              _jsx(TextInput, {

                ref: (ref) => {
                  if (ref) {
                    inputRefs.current[index] = ref;
                  }
                },
                style: styles.otpBox,
                value: digit,
                onChangeText: (value) => handleOtpChange(value, index),
                onKeyPress: ({ nativeEvent }) => handleKeyPress(nativeEvent.key, index),
                keyboardType: "numeric",
                maxLength: 1,
                textAlign: "center",
                autoCapitalize: "none",
                autoCorrect: false }, index
              )
              ) }
            ),


            _jsx(Text, { style: styles.instructionText, children: "We'll send a verification code to the number if it's being in our system" }

            ),


            _jsx(TouchableOpacity, {
              style: [
              styles.resendButton,
              !isOtpComplete() && styles.resendButtonDisabled],

              onPress: handleResend,
              disabled: !isOtpComplete(), children:

              _jsx(Text, { style: [
                styles.resendButtonText,
                !isOtpComplete() && styles.resendButtonTextDisabled], children:
                "Resend" }) }
            ),


            _jsx(Text, { style: styles.cantLoginText, children: "Cant Login?" }),

            _jsxs(View, { style: styles.helpButtonsContainer, children: [
              _jsx(TouchableOpacity, { style: styles.helpButton, onPress: handlePasswordReset, children:
                _jsx(Text, { style: styles.helpButtonText, children: "Password Reset" }) }
              ),

              _jsx(TouchableOpacity, { style: styles.helpButton, onPress: handleLogin, children:
                _jsx(Text, { style: styles.helpButtonText, children: "Login" }) }
              )] }
            ),


            _jsxs(View, { style: styles.signUpContainer, children: [
              _jsx(Text, { style: styles.signUpText, children: "Don't have an account ? " }),
              _jsx(TouchableOpacity, { onPress: handleSignUp, children:
                _jsx(Text, { style: styles.signUpLink, children: "Sign up" }) }
              )] }
            )] }
          ) }
        ) }
      ),


      _jsx(Modal, {
        visible: showResendPopup,
        transparent: true,
        animationType: "fade",
        onRequestClose: handleCloseResendPopup, children:

        _jsx(View, { style: styles.modalOverlay, children:
          _jsxs(View, { style: styles.popupContainer, children: [

            _jsx(View, { style: styles.successIconContainer, children:
              _jsx(Text, { style: styles.successIcon, children: "\u2713" }) }
            ),


            _jsx(Text, { style: styles.popupTitle, children: "OTP Resent Successfully!" }),
            _jsx(Text, { style: styles.popupMessage, children: "A new verification code has been sent to your registered phone number." }

            ),


            _jsx(TouchableOpacity, { style: styles.closeButton, onPress: handleCloseResendPopup, children:
              _jsx(Text, { style: styles.closeButtonText, children: "Close" }) }
            )] }
          ) }
        ) }
      )] }
    ));

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
  }
});